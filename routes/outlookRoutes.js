const express = require('express');
const axios = require('axios');

const router = express.Router();

// Route to get Outlook OAuth redirect URL  
router.get('/get-redirect-url', async (req, res) => {
	try {
		const url = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${process.env.AZURE_CLIENT_ID}&response_type=code&redirect_uri=${process.env.AZURE_REDIRECT_URI}&response_mode=query&scope=offline_access%20user.read%20mail.read&state=12345`;
		res.json({ url });
	} catch (err) {
		console.error({ msg: err.message });
		res.status(500).send("Internal Server Error");
	}
});

// Outlook OAuth Callback  
router.get('/callback', async (req, res) => {
	try {
		const code = req.query.code;
		if (!code) {
			return res.status(400).send("Authorization code is required");
		}

		const body = new URLSearchParams({
			client_id: process.env.AZURE_CLIENT_ID ?? "",
			scope: "user.read mail.read",
			code: code,
			redirect_uri: process.env.AZURE_REDIRECT_URI ?? "",
			grant_type: "authorization_code",
			client_secret: process.env.AZURE_CLIENT_SECRET ?? "",
		});

		const tokenResponse = await axios.post(
			`https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/token`,
			body.toString(),
			{
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
			}
		);

		if (tokenResponse.status !== 200) {
			throw new Error(`Failed to fetch token: ${tokenResponse.status} ${tokenResponse.statusText}`);
		}

		const tokenData = tokenResponse.data;
		const accessToken = tokenData.access_token;
		if (!accessToken) {
			throw new Error("Access token missing in the response");
		}

		res.redirect(`${process.env.NEXT_PUBLIC_OUTLOOK_REDIRECT_URI}?accessToken=${encodeURIComponent(accessToken)}`);
	} catch (err) {
		console.error("Error fetching access token:", err.message);
		res.status(500).send("Error in processing the request");
	}
});

module.exports = router;