const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the EmailSchema  
const EmailSchema = new Schema({
  userEmail: { type: String, default: "" },
  contactName: { type: String, default: "" },
  contactEmail: { type: String, default: "" },
  sentCount: { type: Number, default: 0 },
  receivedCount: { type: Number, default: 0 },
}, { timestamps: true });

// Define the ContactSchema  
const ContactSchema = new Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    userEmail: { type: String, default: "" },
    type: { type: String, default: "" },
    emails: [EmailSchema]
  },
  { timestamps: true }
);

// Export the models  
const Email = mongoose.model('Email', EmailSchema);
const Contact = mongoose.model("Contact", ContactSchema);

module.exports = { Email, Contact };