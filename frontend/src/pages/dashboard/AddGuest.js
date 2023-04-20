import AppTitle from "../../components/AppTitle";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Form, Space, Switch, Input, Button, DatePicker, Typography, Tooltip } from "antd";

export default function AddGuest({ isGuestAcceptance = false }) {
  const [form] = Form.useForm();

  const { Title } = Typography;

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    recordingDate: "",
    jobTitle: "",
    topic: "",
    automation: false,
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!isGuestAcceptance && <AppTitle title='Add Guest' />}

      <div className='add-guest'>
        {!isGuestAcceptance && (
          <>
            <Title className='m-0 mb-1'>Add Guest</Title>

            <Title level={5} className='m-0 mb-4 fw-400 color-45485C'>
              Enter your guest details to automate their pre-episode promotion on social media
            </Title>
          </>
        )}

        <Form
          form={form}
          size='large'
          layout='vertical'
          onFinish={onSubmit}
          initialValues={initialValues}
          className={isGuestAcceptance ? "w-100" : "w-80"}
        >
          <div className='flex-item gap-2'>
            <Form.Item name='firstName' label='Guest First Name' className='flex-1'>
              <Input placeholder='Guest First Name' />
            </Form.Item>
            <Form.Item name='lastName' label='Guest Last Name' className='flex-1'>
              <Input placeholder='Guest Last Name' />
            </Form.Item>
            <Form.Item name='email' label='Guest Email' className='flex-1'>
              <Input placeholder='Guest Email' />
            </Form.Item>
          </div>

          <div className='flex-item gap-2'>
            <Form.Item name='recordingDate' label='Recording Date' className='flex-1'>
              <DatePicker className='w-100' />
            </Form.Item>
            <Form.Item name='jobTitle' label='Guest Job Title and Business' className='flex-1'>
              <Input placeholder='Guest Job Title and Business' />
            </Form.Item>
            <Form.Item name='topic' label='Potential Topic (Optional)' className='flex-1'>
              <Input placeholder='Potential Topic (Optional)' />
            </Form.Item>
          </div>

          {!isGuestAcceptance && (
            <>
              <Form.Item name='automation' label='Start Host Automation Now' valuePropName='checked'>
                <Space>
                  <Switch id='hostauto' />
                  <label htmlFor='hostauto' className='pointer'>
                    Start when guest starts
                  </label>
                </Space>
              </Form.Item>

              <Space>
                <Button shape='round' htmlType='submit' className='minw-110px primary-outlined' loading={false}>
                  ADD GUEST
                </Button>

                <Button
                  disabled
                  type='primary'
                  shape='round'
                  icon={
                    <Tooltip title='Upload a spreadsheet of guests. Each column should match above fields labels EXACTLY (case sensitive so copy/paste).'>
                      <QuestionCircleOutlined />
                    </Tooltip>
                  }
                >
                  UPLOAD CSV
                </Button>

                <Button disabled type='primary' shape='round'>
                  AUTOMATE GUEST
                </Button>
              </Space>
            </>
          )}
        </Form>
      </div>
    </>
  );
}
