import { Typography } from "antd";
import { Link } from "react-router-dom";
import { PATH_AUTH } from "../../routes/paths";
import AppTitle from "../../components/AppTitle";

export default function VerifyCodePage() {
  const { Paragraph } = Typography;

  return (
    <>
      <AppTitle title='Verify Code' />

      {/* <EmailInboxIcon sx={{ mb: 5, height: 96 }} /> */}

      <Paragraph>Please check your email!</Paragraph>

      <Paragraph color='secondary'>
        We have emailed a 6-digit confirmation code to acb@domain, please enter the code in below box to verify your email.
      </Paragraph>

      <h2>AuthVerifyCodeForm</h2>

      <Paragraph>
        Don’t have a code? &nbsp;
        <Link>Resend code</Link>
      </Paragraph>

      <Link to={PATH_AUTH.login}>
        {/* <Iconify icon="eva:chevron-left-fill" width={16} /> */}
        Return to sign in
      </Link>
    </>
  );
}
