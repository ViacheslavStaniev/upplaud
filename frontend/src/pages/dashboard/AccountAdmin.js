import ShowInfo from "./ShowInfo";
import AppTitle from "../../components/AppTitle";
import SocialMediaConnect from "./SocialMediaConnect";
// import { useAuthContext } from "../../auth/useAuthContext";
import { Form, Input, Button, Divider, Typography } from "antd";

export default function AccountAdmin() {
  const [form] = Form.useForm();
  // const { user } = useAuthContext();

  const { Title } = Typography;

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AppTitle title='Account Admin' />

      <div className='account-admin'>
        <Title className='m-0 mb-1'>Account Admin</Title>

        <Title level={5} className='m-0 mb-4 fw-400 color-45485C'>
          Here you can track the automation of your guests:
        </Title>

        <Form
          form={form}
          size='large'
          className='w-80 '
          layout='vertical'
          onFinish={onSubmit}
          initialValues={{ firstName: "", lastName: "", emain: "", userName: "" }}
        >
          <div className='flex-item gap-2'>
            <Form.Item name='firstName' label='FIRST NAME' className='flex-1'>
              <Input placeholder='FIRST NAME' />
            </Form.Item>
            <Form.Item name='lastName' label='LAST NAME' className='flex-1'>
              <Input placeholder='LAST NAME' />
            </Form.Item>
          </div>

          <div className='flex-item gap-2'>
            <Form.Item name='email' label='EMAIL' className='flex-1'>
              <Input placeholder='EMAIL' />
            </Form.Item>
            <Form.Item name='userName' label='Guestii Prefix' className='flex-1'>
              <Input placeholder='SUFFIX' prefix={`${window.location.hostname.toUpperCase()}/`} />
            </Form.Item>
          </div>

          <Button shape='round' className='minw-110px primary-outlined' loading={false}>
            SAVE
          </Button>
        </Form>

        <Divider />

        <ShowInfo />

        <Divider />

        <SocialMediaConnect />
      </div>
    </>
  );
}
