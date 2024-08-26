const express = require('express');
const router = express.Router();
const EmailAutomation = require('../models/EmailAutomation');
const { scheduleHourlyCheck, cancelAutomation, unsubscribeAutomation } = require('../helpers/scheduler');

// Create new automations  
router.post('/create', async (req, res) => {
    try {
        const { emailContent, destEmails, frequency, endTime } = req.body;
        const startTime = new Date(new Date().getTime() + 5 * 60 * 1000);

        let savedAutomations = [];

        for (let destEmail of destEmails) {
            const automation = new EmailAutomation({
                emailContent,
                destEmail,
                frequency,
                startTime,
                endTime,
                cronJobId: 'hourly-check', // All automations will use this single cron job  
            });

            const savedAutomation = await automation.save();
            savedAutomations.push(savedAutomation);
        }

        res.status(201).send(savedAutomations);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/unsubscribe/:uniqueID/:email', async (req, res) => {
    const session = await EmailAutomation.startSession();
    session.startTransaction();

    try {
        const { email, uniqueID } = req.params;

        if (!email || !uniqueID) {
            return res.status(400).send('Please provide both email and uniqueID');
        }

        const guest = await Guest.findOne({ uniqueId: uniqueID });
        if (!guest) {
            return res.status(404).send('Poll not found');
        }

        // Remove email from selectedEmails array  
        guest.selectedEmails = guest.selectedEmails.filter(selectedEmail => selectedEmail !== email);

        await guest.save({ session });

        // Remove email automation entry  
        await EmailAutomation.deleteOne({ destEmail: email, cronJobId: uniqueID }, { session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).send('Unsubscribed successfully');
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        res.status(500).send(error.message);
    }
});  

module.exports = router;