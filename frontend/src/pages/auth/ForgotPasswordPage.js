import { Link } from 'react-router-dom';
import { PATH_AUTH } from '../../routes/paths';
import { LoginOutlined } from '@ant-design/icons';
import { useAuthContext } from '../../auth/AuthProvider';
import { Form, Alert, Input, Button, Typography } from 'antd';
import LoginLayout from '../../layouts/LoginLayout';

const { Title, Paragraph } = Typography;

export default function ForgotPasswordPage() {
  const { forgotPassword, update, errors, isLoading } = useAuthContext();

  return (
    <LoginLayout title="Forgot Password">
      <Title level={3}>Forgot your password?</Title>

      <Paragraph color="secondary">
        Please enter the email address associated with your account and We will email you a link to
        reset your password.
      </Paragraph>

      {errors &&
        errors.map((error, index) => (
          <Alert
            showIcon
            closable
            key={index}
            type="error"
            className="mb-2"
            message={error.msg}
            onClose={() => update({ errors: null })}
          />
        ))}

      <Form size="large" layout="vertical" onFinish={forgotPassword} initialValues={{ email: '' }}>
        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { type: 'email', message: 'Please enter the valid email.' },
            { required: true, message: 'Please fill the email address.' },
          ]}
        >
          <Input autoFocus type="email" placeholder="Email Address" />
        </Form.Item>

        <Button block type="primary" htmlType="submit" loading={isLoading}>
          Send Reset Link
        </Button>
      </Form>

      <Link to={PATH_AUTH.login}>
        <Button block type="link" icon={<LoginOutlined />}>
          Return to sign in
        </Button>
      </Link>
    </LoginLayout>
  );
}
