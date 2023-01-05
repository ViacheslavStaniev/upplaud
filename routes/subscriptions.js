const express = require("express");
const router = express.Router();
const Subscription = require("../models/Subsciptions");
const {
  SUBSCRIPTION_INACTIVE,
  SUBSCRIPTION_ACTIVE,
  SUBSCRIPTION_CANCELLED,
  SUBSCRIPTION_UPGRADED,
  PLAN_FREE,
} = require("../models/Subsciptions");

async function getSubscription(data) {
  try {
    const subscription = await Subscription.findOne(data);
    return subscription;
  } catch (err) {
    console.log(err.message);
    return false;
  }
}

//Create multiple subscription
async function createSubscriptions(products, session) {
  try {
    const subscriptions = await Subscription.insertMany(products, session);
    return subscriptions;
  } catch (err) {
    console.log(err.message);
    return false;
  }
}

//Create a subscription
async function createSubscription(subData, session) {
  try {
    const subscription = new Subscription(subData);
    await subscription.save(session);
    return subscription;
  } catch (err) {
    console.log(err.message);
  }
}
//Update a subscription
async function updateSubscription(subData, param = null) {
  try {
    const session = await Subscription.startSession();
    const options = { session };
    session.startTransaction();

    if (param) {
      if (param == "secure") {
        const activeSub = await userSubscriptions(subData.email, subData.product, SUBSCRIPTION_ACTIVE, session);
        await deactivateCurrentSubscription(activeSub, subData, options);
      } else if (param == "subscription_update" && subData.subId) {
        await Subscription.findOneAndUpdate(
          { st_sub_id: subData.subId, status: SUBSCRIPTION_ACTIVE },
          {
            status: SUBSCRIPTION_UPGRADED,
          },
          options
        );
      }
    }
    const data = {};
    if (subData.status) data.status = subData.status;
    if (subData.st_cust_id) data.st_cust_id = subData.st_cust_id;
    if (subData.end_date) data.end_date = subData.end_date;
    if (subData.renewSubscription) data.$push = { invoice_url: { url: subData.renewSubscription } };
    await Subscription.findByIdAndUpdate(subData.id, data, options);

    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    // throw err;
    console.log(err.message);
    await session.abortTransaction();
    session.endSession();
  }
}

async function purchaseSubscription(subData, data) {
  try {
    const session = await Subscription.startSession();
    const options = { session };
    session.startTransaction();
    //Create subscription
    const newSub = await createSubscription(subData, options);

    //Find active Subscription

    const activeSub = null;

    //Deactivate active subscription and add customer id to it
    if (subData.status == SUBSCRIPTION_ACTIVE) {
      await deactivateCurrentSubscription(activeSub, subData, options);
    }

    //Add new subcription in account
    const accData = {};
    if (newSub.id) accData.subscription = newSub.id;
    if (subData.st_cust_id) accData.stripe_cust_id = subData.st_cust_id;
    // await updateAccountSubscription(data.accountId, accData, options);

    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    // throw err;
    console.log(err.message);
    await session.abortTransaction();
    session.endSession();
  }
}

async function cancelSubscription(data) {
  try {
    const session = await Subscription.startSession();
    const options = { session };
    session.startTransaction();

    // Set current subscription status to cancel
    await Subscription.findByIdAndUpdate(data.subId, { status: SUBSCRIPTION_CANCELLED }, options);
    // Set Default subscription (Free) status to active
    await Subscription.findOneAndUpdate(
      {
        st_cust_id: data.customerId,
        product: data.product,
        status: SUBSCRIPTION_INACTIVE,
        "plans.type": PLAN_FREE,
      },
      {
        status: SUBSCRIPTION_ACTIVE,
        end_date: new Date() - 1 * 1 * 60 * 60 * 1000, // Set end date to 1 hour before current time
      },
      options
    );
    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    console.log(err.message);
    await session.abortTransaction();
    session.endSession();
    // throw err;
  }
}

async function upgradeSubscriptionPlan(data) {
  try {
    const session = await Subscription.startSession();
    const options = { session };
    session.startTransaction();
    // Set current subscription status to upgraded
    if (data.status == SUBSCRIPTION_ACTIVE) {
      await Subscription.findOneAndUpdate({ st_sub_id: data.st_sub_id }, { status: SUBSCRIPTION_UPGRADED }, options);
    }

    //Create new subscription
    const newSub = await createSubscription(data, options);
    //Add new subscription in account
    const accData = {};
    if (newSub.id) accData.subscription = newSub.id;
    // await updateAccountSubscription(data.accountId, accData, options);

    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    console.log(err.message);
    await session.abortTransaction();
    session.endSession();
    // throw err;
  }
}

async function deactivateSubscription(id) {
  try {
    return await Subscription.findByIdAndUpdate(id, {
      status: SUBSCRIPTION_INACTIVE,
      end_date: new Date() - 1 * 1 * 60 * 60 * 1000, // Set end date to 1 hour before current time
    });
  } catch (err) {
    console.log(err.message);
    return false;
  }
}

async function deactivateCurrentSubscription(activeSub, subData, options) {
  try {
    await Subscription.findByIdAndUpdate(
      activeSub.subscriptions[0].id,
      {
        status: SUBSCRIPTION_INACTIVE,
        st_cust_id: subData.st_cust_id,
        end_date: new Date() - 1 * 1 * 60 * 60 * 1000, // Set end date to 1 hour before current time
      },
      options
    );
  } catch (err) {
    console.log(err.message);
    return false;
  }
}

async function activeDefaultSubscriptions(toActiveSub, toDeActiveSub) {
  try {
    const session = await Subscription.startSession();
    const options = { session };
    session.startTransaction();

    await Subscription.updateMany(
      {
        _id: { $in: toDeActiveSub },
      },
      {
        status: SUBSCRIPTION_INACTIVE,
      },
      options
    );

    await Subscription.updateMany(
      {
        _id: { $in: toActiveSub },
      },
      {
        status: SUBSCRIPTION_ACTIVE,
        end_date: new Date() - 1 * 1 * 60 * 60 * 1000,
      },
      options
    );

    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    console.log(err.message);
    await session.abortTransaction();
    session.endSession();
    // throw err;
  }
}

module.exports = router;
module.exports.createSubscriptions = createSubscriptions;
module.exports.updateSubscription = updateSubscription;
module.exports.purchaseSubscription = purchaseSubscription;
module.exports.cancelSubscription = cancelSubscription;
module.exports.getSubscription = getSubscription;
module.exports.upgradeSubscriptionPlan = upgradeSubscriptionPlan;
module.exports.deactivateSubscription = deactivateSubscription;
global.activeDefaultSubscriptions = activeDefaultSubscriptions;
