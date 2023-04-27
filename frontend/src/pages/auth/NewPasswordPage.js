import { Typography } from "antd";
import { Link } from "react-router-dom";
import { PATH_AUTH } from "../../routes/paths";
import AppTitle from "../../components/AppTitle";

export default function NewPasswordPage() {
  const { Paragraph } = Typography;

  return (
    <>
      <AppTitle title='New Password' />

      {/* <SentIcon sx={{ mb: 5, height: 96 }} /> */}

      <Paragraph>Request sent successfully!</Paragraph>

      <Paragraph>
        We've sent a 6-digit confirmation email to your email.
        <br />
        Please enter the code in below box to verify your email.
      </Paragraph>

      <h2>AuthNewPasswordForm</h2>

      <Paragraph>
        Don’t have a code? &nbsp;
        <Link>Resend code</Link>
      </Paragraph>

      <Link to={PATH_AUTH.login}>Return to sign in</Link>
    </>
  );
}
