const mongoose = require("mongoose");
const { scheduleHourlyCheck } = require("../helpers/scheduler");

const { MONGO_HOST, MONGO_DATABASE, MONGO_USERNAME, MONGO_PASSWORD, MONGO_CONNECTION_PARAMS, MONGO_CONNECTION_PREFIX } = process.env;

// Connection URI
const dbUri = `${MONGO_CONNECTION_PREFIX}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?${MONGO_CONNECTION_PARAMS}`;

const connectDB = async (max_attempts = 5) => {
  const attempt = async () => {
    if (max_attempts === 0) {
      console.error("Could not connect to MongoDB");
      process.exit(1);
    }

    try {
      await mongoose.connect(dbUri, {
        useNewUrlParser: true, // current URL string parser is deprecated
        useFindAndModify: false, //`findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated.
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected ...");

      scheduleHourlyCheck();

    } catch (err) {
      console.error(err.message);
      console.log("retrying in 2 seconds");
      max_attempts--;

      setTimeout(attempt, 2000);
    }
  };

  await attempt();
};

module.exports = connectDB;
