import { Link, useParams } from 'react-router-dom';
import { PATH_AUTH } from '../../routes/paths';
import { LoginOutlined } from '@ant-design/icons';
import { useAuthContext } from '../../auth/AuthProvider';
import { Form, Alert, Input, Button, Typography } from 'antd';
import LoginLayout from '../../layouts/LoginLayout';

const { Title, Paragraph } = Typography;

export default function ResetPasswordPage() {
  const { token } = useParams();
  const { forgotPassword, update, errors, isLoading } = useAuthContext();

  console.log(token);

  return (
    <LoginLayout title="Reset Password">
      <Title level={3}>Reset your password</Title>

      <Paragraph color="secondary">Please enter the new password.</Paragraph>

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
        size="large"
        layout="vertical"
        onFinish={forgotPassword}
        initialValues={{ password: '', confirmPassword: '' }}
      >
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please fill the password.' }]}
        >
          <Input.Password autoFocus placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={[
            { required: true, message: 'Please fill the confirm password.' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) return Promise.resolve();
                return Promise.reject(
                  new Error('The two passwords that you entered do not match.')
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <Button block type="primary" htmlType="submit" loading={isLoading}>
          Reset Password
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
