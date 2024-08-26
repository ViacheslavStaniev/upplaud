const express = require('express');
const { google } = require('googleapis');
const axios = require('axios');

const router = express.Router();

// Route to get Google OAuth redirect URL  
router.get('/get-redirect-url', async (req, res) => {
	try {
		const oauth2Client = new google.auth.OAuth2(
			process.env.GOOGLE_CLIENT_ID,
			process.env.GOOGLE_CLIENT_SECRET,
			process.env.REDIRECT_URI
		);

		const scopes = ['https://www.googleapis.com/auth/gmail.readonly'];

		const url = oauth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: scopes,
		});

		res.json({ url });
	} catch (err) {
		console.error({ msg: err.message });
		res.status(500).send("Internal Server Error");
	}
});

// Google OAuth Callback  
router.get('/callback', async (req, res) => {
	try {
		const code = req.query.code;
		if (!code) {
			return res.status(400).send("Authorization code is required");
		}

		const oauth2Client = new google.auth.OAuth2(
			process.env.GOOGLE_CLIENT_ID,
			process.env.GOOGLE_CLIENT_SECRET,
			process.env.REDIRECT_URI
		);

		const { tokens } = await oauth2Client.getToken(code);
		oauth2Client.setCredentials(tokens);

		console.log(`${process.env.NEXT_PUBLIC_REDIRECT_URI}?accessToken=${tokens.access_token}`)

		res.redirect(`${process.env.NEXT_PUBLIC_REDIRECT_URI}?accessToken=${tokens.access_token}`);
	} catch (err) {
		console.error({ msg: err.message });
		res.status(500).send("Error in processing the request");
	}
});

module.exports = router;