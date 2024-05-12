import AppTitle from '../../components/AppTitle';
import HeadshotImage from '../layouts/HeadshotImage';
import SocialMediaConnect from './SocialMediaConnect';
import { useAuthContext } from '../../auth/AuthProvider';
import { isMobile, isDesktop } from 'react-device-detect';
import { Form, Input, Button, Divider, Typography, Space } from 'antd';

const { Link, Title, Paragraph } = Typography;

export default function AccountAdmin() {
  const [form] = Form.useForm();
  const { user, update, isLoading, updateUser } = useAuthContext();
  const { firstName, lastName, email, userName, profile = {} } = user;
  const pictureSrc = Form.useWatch(['profile', 'picture'], form);

  return (
    <>
      <AppTitle title="Account Admin" />

      <div className="account-admin">
        <Title level={isMobile ? 3 : 1} className="m-0 mb-1">
          Account Admin
        </Title>

        <Title level={5} className={`m-0 fw-400 color-45485C ${isMobile ? 'mb-2' : 'mb-4'}`}>
          Here you can track the automation of your guests:
        </Title>

        <Form
          form={form}
          size="large"
          layout="vertical"
          onFinish={updateUser}
          className={isDesktop ? 'w-80' : 'w-100'}
          initialValues={{ email, lastName, firstName, profile: { ...profile } }}
        >
          <div className={`flex-item gap-2 ${isMobile && 'flex-column full-width-cols'}`}>
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

          <div
            className={`flex-item gap-2 align-baseline ${
              isMobile && 'flex-column full-width-cols'
            }`}
          >
            <Form.Item name={['profile', 'phone']} label="CELL PHONE" className="flex-1">
              <Input placeholder="CELL PHONE" />
            </Form.Item>
            <Form.Item name={['profile', 'about']} label="BIO OR SOCIAL URL" className="flex-1">
              <Input placeholder="BIO OR SOCIAL URL" />
            </Form.Item>
            <Form.Item name={['profile', 'picture']} label="HEADSHOT IMAGE" className="flex-1">
              <HeadshotImage
                picture={pictureSrc}
                onChange={(picture) => form.setFieldValue('picture', picture)}
              />
            </Form.Item>
          </div>

          <Space size={24} direction={isMobile ? 'vertical' : 'horizontal'}>
            <Button
              shape="round"
              block={isMobile}
              htmlType="submit"
              loading={isLoading}
              className="minw-110px primary-outlined"
            >
              SAVE
            </Button>

            {userName && (
              <Paragraph className="m-0">
                Your Upplaud automations url is{' '}
                <Link
                  strong
                  copyable
                  target="_blank"
                  href={`/user-automations/${userName}`}
                >{`${window.location.origin}/user-automations/${userName}`}</Link>
              </Paragraph>
            )}
          </Space>
        </Form>

        <Divider />

        <SocialMediaConnect user={user} update={update} />
      </div>
    </>
  );
}
