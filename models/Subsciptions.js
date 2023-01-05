const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Product names
const PRODUCT_TREE = "tree-testing";
const PRODUCT_PARTICIPATORY = "participatory-design";
const PRODUCT_CARD = "card-sorting";

//PLANS
const PLAN_FREE = 0;
const PLAN_MONTHLY = 1;
const PLAN_YEARLY = 2;
const PLAN_ENTERPRISES = 3;

//Subscription Status
const SUBSCRIPTION_INACTIVE = 0;
const SUBSCRIPTION_ACTIVE = 1;
const SUBSCRIPTION_CANCELLED = 2;
const SUBSCRIPTION_UPGRADED = 3;

const SubscriptionsSchema = new Schema(
  {
    product: {
      type: String,
      default: PRODUCT_TREE,
    },
    status: {
      type: Number,
      default: SUBSCRIPTION_INACTIVE,
    },
    plans: {
      plan_id: {
        type: String,
      },
      type: {
        type: Number,
        default: PLAN_FREE,
      },
      amount: {
        type: Number,
        default: 0,
      },
      currency: {
        type: String,
        default: "USD",
      },
    },
    collections_method: {
      type: String,
      default: "charge_automatically",
    },
    start_date: {
      type: Date,
      default: Date.now,
    },
    end_date: {
      type: Date,
      default: function () {
        return +new Date() + 7 * 24 * 60 * 60 * 1000;
      },
    },
    st_sub_id: {
      type: String,
    },
    st_cust_id: {
      type: String,
    },
    st_inv_id: {
      type: String,
    },
    st_charge_id: {
      type: String,
    },
    invoice_url: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
        url: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true, autoCreate: true }
);

module.exports = Subscriptions = mongoose.model("Subscriptions", SubscriptionsSchema);
module.exports.PRODUCT_TREE = PRODUCT_TREE;
module.exports.PLAN_MONTHLY = PLAN_MONTHLY;
module.exports.PLAN_YEARLY = PLAN_YEARLY;
module.exports.PLAN_FREE = PLAN_FREE;
module.exports.PLAN_ENTERPRISES = PLAN_ENTERPRISES;
module.exports.PRODUCT_PARTICIPATORY = PRODUCT_PARTICIPATORY;
module.exports.PRODUCT_CARD = PRODUCT_CARD;
module.exports.SUBSCRIPTION_INACTIVE = SUBSCRIPTION_INACTIVE;
module.exports.SUBSCRIPTION_ACTIVE = SUBSCRIPTION_ACTIVE;
module.exports.SUBSCRIPTION_CANCELLED = SUBSCRIPTION_CANCELLED;
module.exports.SUBSCRIPTION_UPGRADED = SUBSCRIPTION_UPGRADED;
