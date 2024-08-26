const cron = require('node-cron');
const nodemailer = require('nodemailer');
const EmailAutomation = require('../models/EmailAutomation');
const Guest = require('../models/Guest');

const { SMTP_PORT, SMTP_HOST, SMTP_USER, SMTP_PASS, FROM_NAME, FROM_EMAIL } = process.env;

const appUrl = "http://localhost:3030"; // Replace with your app's URL  

// Email transporter configuration  
const transporter = nodemailer.createTransport({
    port: SMTP_PORT,
    secure: true,
    host: SMTP_HOST,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
});

// Function to send emails for matching automations  
const sendEmails = async () => {
    console.log('running cron job');
    const now = new Date();

    console.log(now);

    const automations = await EmailAutomation.find({
        startTime: { $lte: now },
        endTime: { $gte: now },
    });

    now.setMinutes(0, 0, 0)
    console.log(automations);

    for (const automation of automations) {
        const { emailContent, destEmail, frequency, startTime, endTime, cronJobId } = automation;
        // Set startTime with minutes and seconds zeroed out for comparison  
        const checkStartTime = new Date(startTime);
        checkStartTime.setMinutes(0, 0, 0);

        // Only send email if now matches the zeroed startTime  
        if (now.getTime() == checkStartTime.getTime()) {
            console.log('+++++++++++++++++', now, checkStartTime, now.getTime() == checkStartTime.getTime(), cronJobId);
            const unsubscribeLink = `${appUrl}/api/emailAutomations/unsubscribe/${cronJobId}/${destEmail}`;
            console.log(unsubscribeLink);
            const fullEmailContent = `${emailContent}\n\nIf you wish to unsubscribe, click here: ${unsubscribeLink}`;

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: destEmail,
                subject: 'Automated Email',
                text: fullEmailContent,
            };

            console.log('-----------------------------Send emails');

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(`Failed to send email to ${destEmail}:`, error);
                } else {
                    console.log(`Email sent to ${destEmail}: ${info.response}`);
                }
            });

            // Calculate the next start time based on frequency  
            let nextStartTime = new Date(startTime);
            if (frequency === '1') nextStartTime.setDate(nextStartTime.getDate() + 30);
            else if (frequency === '2') nextStartTime.setDate(nextStartTime.getDate() + 15);
            else if (frequency === '3') nextStartTime.setDate(nextStartTime.getDate() + 10);
            else if (frequency === '4') nextStartTime.setDate(nextStartTime.getDate() + 7);

            if (nextStartTime > endTime) {

                const guest = await Guest.findOne({ cronJobId });

                if (guest) {
                    // Remove the email from Guest selectedEmails  
                    const emailIndex = guest.selectedEmails.indexOf(destEmail);
                    if (emailIndex > -1) {
                        guest.selectedEmails.splice(emailIndex, 1);
                        await guest.save();
                    }
                }

                await EmailAutomation.deleteOne({ _id: automation._id });
                console.log(`Automation for ${destEmail} ended and deleted.`);
            } else {
                automation.startTime = nextStartTime;
                await automation.save();
            }
        }
    }
};

// Schedule a single cron job that runs every hour  
const scheduleHourlyCheck = () => {
    cron.schedule('* * * * *', sendEmails); // Runs every minute
};

// Cancel automation  
const cancelAutomation = async (identifier) => {
    const query = identifier.includes('@') ? { destEmail: identifier } : { cronJobId: identifier };
    const automation = await EmailAutomation.findOne(query);
    if (automation) {
        await EmailAutomation.deleteOne({ _id: automation._id });
    }
};

// Unsubscribe from automation  
const unsubscribeAutomation = async (destEmail) => {
    await cancelAutomation(destEmail);
};

module.exports = { scheduleHourlyCheck, cancelAutomation, unsubscribeAutomation };