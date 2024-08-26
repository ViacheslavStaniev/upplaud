const express = require("express");
const { Contact } = require("../models/Contact");
const verifyAuth = require("../config/verifyAuth");

const router = express.Router();

// @route   GET api/contacts  
// @desc    Fetches all contacts for the current logged-in user  
// @access  Private  
router.get("/", async (req, res) => {
	try {
		const contacts = await Contact.find({ userEmail: req.query.email });
		console.log(contacts);
		res.json(contacts);
	} catch (err) {
		console.error({ msg: err.message });
		res.status(500).send("Internal Server Error");
	}
});

// @route   POST api/contacts  
// @desc    Create or update contacts from an array, removing duplicates per userEmail  
// @access  Private  
router.post("/", async (req, res) => {
	const contactsArray = req.body.contacts;
	const type = req.body.type;
	const email = req.body.email;
	const userEmail = req.body.userEmail;  // Assume this comes from request body  

	if (!Array.isArray(contactsArray) || !type || !userEmail) {
		return res.status(400).send({ errors: ["Invalid data, expected an array of contacts, a type, and a user email."] });
	}

	try {
		// Count all documents of the specified type  
		const count = await Contact.countDocuments({ userEmail, type });

		const contactName = `${type.charAt(0).toUpperCase() + type.slice(1)} ${count + 1}`;

		// Fetch the existing contacts for the user  
		let existingContact = await Contact.findOne({ userEmail, type, email });
		if (existingContact) {
			const updatedContacts = await Contact.find({ userEmail });
			return res.json(updatedContacts);
		}
		const newContact = new Contact({
			name: contactName,
			email,
			userEmail,
			type,
			emails: contactsArray.map(contactData => ({
				contactName: contactData.contactName,
				contactEmail: contactData.contactEmail,
				sentCount: contactData.sentCount,
				receivedCount: contactData.receivedCount,
			})),
		});
		await newContact.save();

		const updatedContacts = await Contact.find({ userEmail });
		return res.json(updatedContacts);
	} catch (err) {
		console.error({ msg: err.message });
		res.status(500).send("Internal Server Error");
	}
});

// @route   DELETE api/contacts/:contactId  
// @desc    Deletes a contact  
// @access  Private  
router.delete("/:contactId", verifyAuth, async (req, res) => {
	try {
		await Contact.findByIdAndDelete(req.params.contactId);
		res.json({ msg: "Contact deleted successfully." });
	} catch (err) {
		console.error({ msg: err.message });
		res.status(500).send("Internal Server Error");
	}
});

module.exports = router;