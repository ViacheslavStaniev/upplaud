const express = require("express");
const { Email } = require("../models/Contact");
const verifyAuth = require("../config/verifyAuth");
const Guest = require("../models/Guest");
const EmailAutomation = require("../models/EmailAutomation");

const router = express.Router();

// Add a new route for handling email uploads  
router.post("/", async (req, res) => {
    const { userEmail, contacts, isGuest, userId, frequency } = req.body;

    if (!userEmail || !Array.isArray(contacts)) {
        return res.status(400).send({ errors: ["Invalid data provided."] });
    }

    try {
        for (const contact of contacts) {
            await Email.findOneAndUpdate(
                { userEmail, contactEmail: contact.contactEmail },
                {
                    userEmail,
                    contactEmail: contact.contactEmail,
                    contactName: contact.contactName,
                    sentCount: contact.sentCount,
                    receivedCount: contact.receivedCount
                },
                { upsert: true, new: true }
            );
        }

        // If the contact is a guest, update the guest's selectedEmails  
        if (isGuest) {
            const guest = (await Guest.find({ guest: userId }))[0];
            console.log(await Guest.find({ guest: userId }));
            if (guest) {
                // Extract email addresses from contacts array  
                const contactEmails = contacts.map(contact => contact.contactEmail);

                // Combine existing selectedEmails with new ones and make sure there are no duplicates  
                const updatedEmails = Array.from(new Set([...guest.selectedEmails, ...contactEmails]));

                // Update selectedEmails for the guest  
                guest.selectedEmails = updatedEmails;
                await guest.save();

                for (const destEmail of contactEmails) {
                    // Calculate the new start time, 5 minutes later  
                    const newStartTime = new Date();
                    newStartTime.setMinutes(newStartTime.getMinutes() + 5);

                    const existingEntry = await EmailAutomation.findOne({
                        cronJobId: guest.uniqueId,
                        destEmail: destEmail
                    });

                    if (existingEntry) {
                        // Update the existing entry  
                        existingEntry.emailContent = "Test"; // adapt as needed   
                        existingEntry.frequency = frequency;
                        existingEntry.startTime = newStartTime;
                        existingEntry.endTime = new Date(guest.recordingDate);

                        await existingEntry.save();
                    } else {
                        // Create a new entry if not exists  
                        const emailAutomation = new EmailAutomation({
                            emailContent: "Test", // adapt as needed   
                            destEmail,
                            frequency,
                            startTime: newStartTime,
                            endTime: new Date(guest.recordingDate),
                            cronJobId: guest.uniqueId
                        });

                        await emailAutomation.save();
                    }
                }

            } else {
                return res.status(404).send({ errors: ["Guest not found."] });
            }
        }

        res.status(200).json({ msg: 'Emails uploaded successfully' });
    } catch (err) {
        console.error({ msg: err.message });
        res.status(500).send("Internal Server Error");
    }
});

// Add GET endpoint to return emails by userEmail  
router.get("/", verifyAuth, async (req, res) => {
    const { email } = req.query;

    try {
        const emails = await Email.find({ userEmail: email });

        if (!emails) {
            return res.status(404).json({ msg: 'No emails found for this user' });
        }

        res.status(200).json(emails);
    } catch (err) {
        console.error({ msg: err.message });
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;