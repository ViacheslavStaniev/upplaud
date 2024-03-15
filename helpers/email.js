const nodemailer = require("nodemailer");
const { SMTP_PORT, SMTP_HOST, SMTP_USER, SMTP_PASS, FROM_NAME, FROM_EMAIL } = process.env;

const getFromName = (fromName = "") => `"${fromName || FROM_NAME}" <${FROM_EMAIL}>`;

const transporter = nodemailer.createTransport({
  port: SMTP_PORT,
  secure: false,
  host: SMTP_HOST,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

const sendEmail = async (params) => {
  const { to, subject, body, fromName = "" } = params;

  return await transporter.sendMail({ to, from: getFromName(fromName), subject, html: body });
};

module.exports.sendEmail = sendEmail;
