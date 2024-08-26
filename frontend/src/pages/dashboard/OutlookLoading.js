import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, setEmails, hasError } from "../../reducers/emailsSlice";

export default function OutlookLoading() {
	const dispatch = useDispatch();
	const [readEmailCount, setReadEmailCount] = useState(0);
	const [totalCount, setTotalCount] = useState(0);

	const fetchEmails = async (token) => {
		if (!token) return;

		try {
			const userDetails = await fetch("https://graph.microsoft.com/v1.0/me", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}).then((res) => res.json());

			let path =
				"https://graph.microsoft.com/v1.0/me/messages?$top=500&$select=from,toRecipients";

			const sent = {};
			const received = {};
			const name = {};

			while (path) {
				const graphResponse = await fetch(path, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}).then((res) => res.json());

				graphResponse.value.forEach((d) => {
					let email = "";
					const userMail = userDetails.mail;

					if (d.from.emailAddress.address === userMail) {
						email = d.toRecipients[0].emailAddress.address;
						if (email) {
							name[email] = d.toRecipients[0].emailAddress.name;
						}
						sent[email] = (sent[email] ?? 0) + 1;
						received[email] = received[email] ?? 0;
						setReadEmailCount(readEmailCount + 1);
						setTotalCount(totalCount + 1);
					} else if (
						d.toRecipients[0].emailAddress.address === userMail
					) {
						email = d.from.emailAddress.address;
						if (email) {
							name[email] = d.from.emailAddress.name;
						}
						sent[email] = sent[email] ?? 0;
						received[email] = (received[email] ?? 0) + 1;
						setReadEmailCount(readEmailCount + 1);
						setTotalCount(totalCount + 1);
					}
				});

				path = graphResponse["@odata.nextLink"];
			}

			generateCSV(sent, received, name, userDetails.mail);
		} catch (err) {
			console.error("Error fetching emails:", err);
			dispatch(hasError(err));
		}
	};

	const generateCSV = (sent, received, name, userEmail) => {
		const csvRows = [];
		Object.keys(sent)
			.sort((email1, email2) => sent[email2] - sent[email1])
			.forEach((email) => {
				if (sent[email] >= 1 && received[email] >= 1)
					csvRows.push({
						email,
						name: name[email].length === 0 ? email : name[email],
						sent: sent[email],
						received: received[email]
					});
			});

		dispatch(setEmails(csvRows));
		window.location.href =
			process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3030";
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