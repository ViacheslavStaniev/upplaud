import { Typography } from "antd";
import { Link } from "react-router-dom";
import { PATH_AUTH } from "../../routes/paths";
import AppTitle from "../../components/AppTitle";

export default function ResetPasswordPage() {
  const { Paragraph } = Typography;

  return (
    <>
      <AppTitle title='Reset Password' />

      {/* <PasswordIcon sx={{ mb: 5, height: 96 }} /> */}

      <Paragraph>Forgot your password?</Paragraph>

      <Paragraph color='secondary'>
        Please enter the email address associated with your account and We will email you a link to reset your password.
      </Paragraph>

      <h2>AuthResetPasswordForm</h2>

      <Link to={PATH_AUTH.login}>
        {/* <Iconify icon="eva:chevron-left-fill" width={16} /> */}
        Return to sign in
      </Link>
    </>
  );
}
