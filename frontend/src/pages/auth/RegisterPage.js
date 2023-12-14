// import SocialLogin from './SocialLogin';
import LoginLayout from '../../layouts/LoginLayout';
import { Link } from 'react-router-dom';
import { PATH_AUTH, PATH_PAGE } from '../../routes/paths';
import { useAuthContext } from '../../auth/AuthProvider';
import { Form, Typography, Button, Input, Alert, Space } from 'antd';

const { Title, Paragraph } = Typography;

export default function RegisterPage() {
  const [form] = Form.useForm();
  const { register, update, errors, isLoading } = useAuthContext();

  return (
    <LoginLayout title="Register">
      <Title level={3}>Get started absolutely free.</Title>
      <Paragraph>
        Already have an account? <Link to={PATH_AUTH.login}>Sign In</Link>
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
        onFinish={register}
        initialValues={{ email: '', password: '', firstName: '', lastName: '' }}
      >
        <Space>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please fill the First Name' }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item name="lastName" label="Last Name">
            <Input placeholder="Last Name" />
          </Form.Item>
        </Space>

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

        <Button block type="primary" htmlType="submit" loading={isLoading}>
          Create Account
        </Button>
      </Form>

      <Paragraph>
        By signing up, I agree to <Link to={PATH_PAGE.tos}>Terms of Service</Link> and{' '}
        <Link to={PATH_PAGE.privacy}>Privacy Policy</Link>.
      </Paragraph>

      {/* <Divider plain>OR</Divider> */}

      {/* <SocialLogin /> */}
    </LoginLayout>
  );
}
