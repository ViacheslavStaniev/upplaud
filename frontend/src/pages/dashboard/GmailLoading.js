import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, setEmails, hasError, setEmailsForGuestPage } from "../../reducers/emailsSlice";
import axios from "../../utils/axios";

export default function GmailLoading() {
	const dispatch = useDispatch();
	const [totalCount, setTotalCount] = useState(0);
	const [readEmailCount, setReadEmailCount] = useState(0);
	const { originURL, originType, emailForSocialConnect } = useSelector(state => state.emails);
	const { user } = useSelector(state => state.user); // Assuming `user` contains `profile.email`  

	const extractEmail = (text) => {
		let name = "";
		let email = "";

		if (text.includes("<")) {
			const parts = text.split("<");
			name = parts[0].trim();
			email = parts[1].slice(0, -1).trim();
		} else {
			email = text.trim();
		}

		return { name, email };
	};

	const fetchEmails = async (token) => {
		if (!token) return;

		try {
			const url = "https://www.googleapis.com/gmail/v1/users/me/profile";
			const response = await fetch(url, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const mGmail = (await response.json()).emailAddress ?? "";

			const apiBase = "https://www.googleapis.com/gmail/v1/users/me/messages";
			let allEmails = [];
			let pageToken = null;

			const formatDate = (date) => {
				let year = date.getFullYear();
				let month = (date.getMonth() + 1).toString().padStart(2, "0");
				let day = date.getDate().toString().padStart(2, "0");

				return `${year}/${month}/${day}`;
			};

			let today = new Date();
			let tomorrow = new Date();
			tomorrow.setDate(today.getDate() + 1);

			let oneYearAgoTomorrow = new Date(tomorrow);
			oneYearAgoTomorrow.setFullYear(tomorrow.getFullYear() - 1);

			let formattedTomorrow = formatDate(tomorrow);
			let formattedOneYearAgoTomorrow = formatDate(oneYearAgoTomorrow);

			do {
				const response = await fetch(
					`${apiBase}?q=after:${formattedOneYearAgoTomorrow} before:${formattedTomorrow}&access_token=${token}${pageToken ? "&pageToken=" + pageToken : ""
					}`
				);
				const data = await response.json();
				allEmails = [...allEmails, ...data.messages];
				pageToken = data.nextPageToken;
				setTotalCount(allEmails.length);
			} while (pageToken);

			const chunkSize = 500;
			const chunkedEmails = allEmails.reduce((result, email, index) => {
				const chunkIndex = Math.floor(index / chunkSize);
				if (!result[chunkIndex]) {
					result[chunkIndex] = [];
				}
				result[chunkIndex].push(email);
				return result;
			}, []);

			const details = [];

			for (let emailChunk of chunkedEmails) {
				const chunkDetails = await Promise.all(
					emailChunk.map(async (email) => {
						while (true) {
							try {
								const response = await fetch(
									`${apiBase}/${email.id}?access_token=${token}`
								);
								if (response.status !== 200) {
									continue;
								}
								const detailData = await response.json();
								return detailData;
							} catch (e) {
								console.error(e);
							}
						}
					})
				);
				details.push(...chunkDetails);
				setReadEmailCount(details.length);
			}

			const count = {};
			const sent = {};
			const received = {};
			const name = {};

			details.map((data) => {
				if (!data) return;
				try {
					const from = extractEmail(
						data.payload.headers.find(header => header.name === "From").value
					);
					const to = extractEmail(
						data.payload.headers.find(header => header.name === "To").value
					);
					if (to.email === mGmail) {
						sent[from.email] = sent[from.email] ?? 0;
						received[from.email] = (received[from.email] ?? 0) + 1;
						name[from.email] = from.name;
					} else if (from.email === mGmail) {
						sent[to.email] = (sent[to.email] ?? 0) + 1;
						received[to.email] = received[to.email] ?? 0;
						if (!name[to.email]) {
							name[to.email] = "";
						}
					}
				} catch (e) { }
			});

			console.log(originURL);

			const csvData = generateCSV(sent, received, name, mGmail);
			console.log(user);
			await sendContactsToBackend(csvData, originType === 'guest' ? emailForSocialConnect : emailForSocialConnect, mGmail);
			
			window.location.href = originURL;

		} catch (error) {
			console.log(error);
		}
	};

	const generateCSV = (sent, received, name, userEmail) => {
		const csvRows = [];
		Object.keys(sent)
			.sort((email1, email2) => sent[email2] - sent[email1])
			.forEach((email) => {
				if (sent[email] >= 1 && received[email] >= 1)
					csvRows.push({
						contactEmail: email,
						contactName: name[email].length === 0 ? email : name[email],
						sentCount: sent[email],
						receivedCount: received[email]
					});
			});

		// dispatch(originType === 'user' ? setEmails(csvRows) : setEmailsForGuestPage(csvRows));
		return csvRows;
	};

	const sendContactsToBackend = async (contacts, userEmail, mGmail) => {
		try {
			const response = await axios.post('/contacts',
				{
					contacts,
					userEmail,
					email: mGmail,
					type: 'gmail'
				},
				{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('authToken')}`
					}
				}
			);

			if (response.status !== 200) {
				throw new Error('Failed to send contacts to backend');
			}
			console.log('Contacts sent successfully:', response.data);
		} catch (error) {
			console.error('Failed to send contacts to backend:', error);
		}
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const token = urlParams.get("accessToken");
		if (token) {
			if (token.length > 0) {
				fetchEmails(token);
			}
		}
	}, []);

	return (
		<main style={{
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			height: '100vh'
		}}>
			<p>{`Counting your emails for 365 days (NOTE: it’s not reading the content of your emails): ${totalCount}`}</p>
			<p>{`Searching for replies to those who sent you emails, and filtering your top VIP contacts: ${readEmailCount}`}</p>
		</main>
	);
}