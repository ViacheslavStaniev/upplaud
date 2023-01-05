const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserAccessSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    ip: {
      type: String
    },
    userAgent: {
      type: String
    },
    country: {
      type: String
    }
  },
  { timestamps: true, autoCreate: true }
);

module.exports = UserAccess = mongoose.model('UserAccess', UserAccessSchema);
