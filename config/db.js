const mongoose = require("mongoose");

const { MONGO_HOST, MONGO_DATABASE, MONGO_USERNAME, MONGO_PASSWORD, MONGO_CONNECTION_PARAMS, MONGO_CONNECTION_PREFIX } = process.env;

const dbHost = MONGO_HOST || "mongo";
const dbName = MONGO_DATABASE || "podasq";
const db = `${MONGO_CONNECTION_PREFIX}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${dbHost}/${dbName}?${MONGO_CONNECTION_PARAMS}`;

const uri = "mongodb+srv://tcmhack:tcmpriya@tcmhack.olsdl.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async (max_attempts = 5) => {
  const attempt = async () => {
    if (max_attempts === 0) {
      console.error("Could not connect to MongoDB");
      process.exit(1);
    }

    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true, // current URL string parser is deprecated
        useFindAndModify: false, //`findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated.
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected ...");
    } catch (err) {
      console.error(err.message);
      console.log("retrying in 5 seconds");
      max_attempts--;

      setTimeout(attempt, 5000);
    }
  };

  await attempt();
};

module.exports = connectDB;
