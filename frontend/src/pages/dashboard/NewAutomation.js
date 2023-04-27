import dayjs from 'dayjs';
import AppTitle from '../../components/AppTitle';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { addGuest, fetchGuest, updateGuest, updateState } from '../../reducers/guestsSlice';
import { Form, Space, Switch, Input, Button, DatePicker, Typography, Tooltip } from 'antd';

const { Title } = Typography;

export default function NewAutomation({ isGuestAcceptance = false }) {
  const [form] = Form.useForm();

  const { id } = useParams();
  const dispatch = useDispatch();

  const isNew = id === 'new'; // new automation
  const withGuestValue = Form.useWatch('withGuest', form);

  const { guest, isLoading } = useSelector((state) => state.guests);
  const {
    recordingDate = null,
    guest: guestUser,
    freebieUrl = '',
    withGuest = true,
    potentialTopics = ['', ''],
    startHostAutomation = false,
  } = guest || {};
  console.log(guest, id, isNew, withGuestValue);

  useEffect(() => {
    if (!isNew && id) dispatch(fetchGuest(id));

    return () => {
      updateState({ guest: null });
    };
  }, [isNew, id, dispatch]);

  useEffect(() => {
    guest && form.resetFields();
  }, [guest, form]);

  const initialValues = {
    withGuest,
    freebieUrl,
    potentialTopics,
    startHostAutomation,
    recordingDate: recordingDate ? dayjs(recordingDate, 'YYYY/MM/DD') : null,
    email: guestUser?.email,
    lastName: guestUser?.lastName,
    firstName: guestUser?.firstName,
    cellPhone: guestUser ? guestUser.profile?.phone : '',
    linkedinUrl: guestUser ? guestUser.socialAccounts?.linkedin.profileLink : '',
  };

  return (
    <>
      {!isGuestAcceptance && <AppTitle title={`${isNew ? 'New' : 'Update'} Automation`} />}

      <div className="add-guest">
        {!isGuestAcceptance && (
          <>
            <Title className="m-0 mb-1">Add Guest</Title>
            <Title level={5} className="m-0 mb-4 fw-400 color-45485C">
              Enter your guest details to automate their pre-episode promotion on social media
            </Title>
          </>
        )}

        <Form
          form={form}
          size="large"
          layout="vertical"
          initialValues={initialValues}
          onFinish={(data) => {
            if (isNew) dispatch(addGuest(data));
            else dispatch(updateGuest(id, data));
          }}
          // className={isGuestAcceptance ? 'w-100' : 'w-80'}
        >
          <Form.Item name="withGuest" valuePropName="checked" label="With Guest">
            <Switch />
          </Form.Item>

          <div className="flex-item gap-2">
            <Form.Item
              className="flex-1"
              name="recordingDate"
              label="Recording Date or Poll End Date"
              rules={[{ required: true, message: 'Please fill the Recording Date.' }]}
            >
              <DatePicker className="w-100" placeholder="Recording Date or Poll End Date" />
            </Form.Item>
            <Form.Item
              name="firstName"
              className="flex-1"
              label="Guest First Name"
              rules={[{ required: withGuestValue, message: 'First Name is required' }]}
            >
              <Input disabled={!withGuestValue} placeholder="Guest First Name" />
            </Form.Item>
            <Form.Item name="lastName" label="Guest Last Name" className="flex-1">
              <Input disabled={!withGuestValue} placeholder="Guest Last Name" />
            </Form.Item>
          </div>

          <div className="flex-item gap-2">
            <Form.Item
              name="email"
              label="Guest Email"
              className="flex-1"
              rules={[{ required: withGuestValue, message: 'Email is required' }]}
            >
              <Input disabled={!withGuestValue} placeholder="Guest Email" />
            </Form.Item>
            <Form.Item name="cellPhone" label="Guest Cell Phone" className="flex-1">
              <Input disabled={!withGuestValue} placeholder="Guest Cell Phone" />
            </Form.Item>
            <Form.Item
              className="flex-1"
              name="linkedinUrl"
              label="Linkedin URL"
              rules={[{ type: 'url', message: 'Please fill a valid URL' }]}
            >
              <Input
                type="url"
                disabled={!withGuestValue}
                placeholder="https:///www.linkedin.com/../username"
              />
            </Form.Item>
          </div>

          <div className="flex-item gap-2">
            <Form.Item
              name="freebieUrl"
              className="flex-1"
              label="Freebie, Gift or Prize URL"
              rules={[{ type: 'url', message: 'Please fill a valid url' }]}
            >
              <Input disabled={!withGuestValue} placeholder="https:///freebie-url.com" />
            </Form.Item>

            <Form.List name="potentialTopics">
              {(fields) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      {...field}
                      className="flex-1"
                      label={`Topic ${index + 1}`}
                      rules={[{ required: true, message: 'Pleas add the topics for voting.' }]}
                    >
                      <Input placeholder="Topics for Voting..." />
                    </Form.Item>
                  ))}
                </>
              )}
            </Form.List>
          </div>

          {!isGuestAcceptance && (
            <>
              <Form.Item
                valuePropName="checked"
                name="startHostAutomation"
                label="Start Host Automation Now"
              >
                <Space>
                  <Switch id="hostauto" disabled={!withGuestValue} />
                  <label htmlFor="hostauto" className="pointer">
                    Start when guest starts
                  </label>
                </Space>
              </Form.Item>

              <Space>
                <Button
                  shape="round"
                  htmlType="submit"
                  loading={isLoading}
                  className="minw-110px primary-outlined"
                >
                  {isNew ? 'ADD TO' : 'UPDATE'} AUTOMATE
                </Button>

                <Button
                  disabled
                  type="primary"
                  shape="round"
                  icon={
                    <Tooltip title="Upload a spreadsheet of guests. Each column should match above fields labels EXACTLY (case sensitive so copy/paste).">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  }
                >
                  UPLOAD CSV
                </Button>
              </Space>
            </>
          )}
        </Form>
      </div>
    </>
  );
}
