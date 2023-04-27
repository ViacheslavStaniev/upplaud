import ShowInfo from './ShowInfo';
import AppTitle from '../../components/AppTitle';
import SocialMediaConnect from './SocialMediaConnect';
import { useAuthContext } from '../../auth/AuthProvider';
import { Form, Input, Button, Divider, Typography, Space } from 'antd';

const { Text, Title, Paragraph } = Typography;

export default function AccountAdmin() {
  const [form] = Form.useForm();
  const { user, isLoading, updateUser } = useAuthContext();
  const { firstName, lastName, email, userName } = user;

  return (
    <>
      <AppTitle title="Account Admin" />

      <div className="account-admin">
        <Title className="m-0 mb-1">Account Admin</Title>

        <Title level={5} className="m-0 mb-4 fw-400 color-45485C">
          Here you can track the automation of your guests:
        </Title>

        <Form
          form={form}
          size="large"
          className="w-80 "
          layout="vertical"
          onFinish={updateUser}
          initialValues={{ firstName, lastName, email }}
        >
          <div className="flex-item gap-2">
            <Form.Item
              name="firstName"
              label="FIRST NAME"
              className="flex-1"
              rules={[{ required: true, message: 'First Name is required.' }]}
            >
              <Input placeholder="FIRST NAME" />
            </Form.Item>
            <Form.Item name="lastName" label="LAST NAME" className="flex-1">
              <Input placeholder="LAST NAME" />
            </Form.Item>
            <Form.Item
              name="email"
              label="EMAIL"
              className="flex-1"
              rules={[
                { required: true, message: 'Email is required.' },
                { type: 'email', message: 'Please enter a valid email.' },
              ]}
            >
              <Input placeholder="EMAIL" />
            </Form.Item>
          </div>

          <Space size={24}>
            <Button
              shape="round"
              htmlType="submit"
              loading={isLoading}
              className="minw-110px primary-outlined"
            >
              SAVE
            </Button>

            {userName && (
              <Paragraph className="m-0">
                YOUR {window.location.hostname.toUpperCase()} SHOW URL is{' '}
                <Text
                  strong
                  copyable
                  className="text-underline"
                >{`${window.location.origin}/show/${userName}`}</Text>
              </Paragraph>
            )}
          </Space>
        </Form>

        <Divider />

        <ShowInfo />

        <Divider />

        <SocialMediaConnect />
      </div>
    </>
  );
}
