// import SocialLogin from './SocialLogin';
import LoginLayout from '../../layouts/LoginLayout';
import { Link } from 'react-router-dom';
import { PATH_AUTH } from '../../routes/paths';
import { useAuthContext } from '../../auth/AuthProvider';
import { Form, Typography, Button, Input, Alert } from 'antd';

const { Title, Paragraph } = Typography;

export default function LoginPage() {
  const [form] = Form.useForm();
  const { login, update, errors, isLoading } = useAuthContext();

  return (
    <LoginLayout title="Login">
      <Title level={3}>Sign in to Upplaud</Title>
      <Paragraph>
        New User? <Link to={PATH_AUTH.register}>Create an account</Link>
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
        initialValues={{ email: '', password: '' }}
      >
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

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please fill the password' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Paragraph className="text-right">
          <Link to={PATH_AUTH.forgotPassword}>Forgot Password?</Link>
        </Paragraph>

        <Button block type="primary" htmlType="submit" loading={isLoading}>
          Login
        </Button>
      </Form>

      {/* <Divider plain>OR</Divider> */}

      {/* <SocialLogin /> */}
    </LoginLayout>
  );
}
