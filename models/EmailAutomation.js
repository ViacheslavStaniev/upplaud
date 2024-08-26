const mongoose = require('mongoose');

const emailAutomationSchema = new mongoose.Schema({
    emailContent: String,
    destEmail: String,
    frequency: String, // '1 week', '2 weeks', etc.  
    startTime: Date,
    endTime: Date,
    cronJobId: String,
});

module.exports = mongoose.model('EmailAutomation', emailAutomationSchema);