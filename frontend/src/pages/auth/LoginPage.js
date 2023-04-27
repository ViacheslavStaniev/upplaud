import SocialLogin from './SocialLogin';
import LoginLayout from '../../layouts/LoginLayout';
import { useAuthContext } from '../../auth/AuthProvider';
import { Form, Typography, Button, Input, Divider, Alert } from 'antd';

const { Title, Paragraph, Link } = Typography;

export default function LoginPage() {
  const [form] = Form.useForm();
  const { login, update, errors, isLoading } = useAuthContext();
  console.log(errors);

  return (
    <LoginLayout title="Login">
      <Title level={3}>Sign in to mic.vote</Title>
      <Paragraph>
        New User? <Link href="/auth/register">Create an account</Link>
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

      <Form
        form={form}
        size="large"
        layout="vertical"
        onFinish={login}
        initialValues={{ email: 'tcmhack@gmail.com', password: '12345678' }}
      >
        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { type: 'email', message: 'Please enter the valid email.' },
            { required: true, message: 'Please fill the email address.' },
          ]}
        >
          <Input type="email" placeholder="Email Address" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please fill the password' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Paragraph className="text-right">
          <Link href="/auth/forgot-password">Forgot Password?</Link>
        </Paragraph>

        <Button block type="primary" htmlType="submit" loading={isLoading}>
          Login
        </Button>
      </Form>

      <Divider plain>OR</Divider>

      <SocialLogin />
    </LoginLayout>
  );
}
