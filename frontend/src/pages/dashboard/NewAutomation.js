import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GUEST_TYPE } from '../../utils/types';
import { useSelector, useDispatch } from 'react-redux';
import { addGuest, fetchGuest, updateGuest, updateState } from '../../reducers/guestsSlice';
import { Form, Space, Input, Button, DatePicker, Typography, Radio, Switch } from 'antd';
import AppTitle from '../../components/AppTitle';
import SocialPostingItem from './SocialPostingItem';
import PollSharingImage from './PollSharingImage';

const { Text, Title } = Typography;
const { HOST_GUEST, SOLO_SESSION, GUEST_SPEAKER } = GUEST_TYPE;

const hostInfoFields = [
  {
    name: ['guest', 'fullName'],
    label: 'FULL NAME',
  },
  {
    name: ['guest', 'cellPhone'],
    label: 'CELL PHONE',
  },
  {
    name: ['guest', 'email'],
    label: 'EMAIL ADDRESS',
  },
  {
    name: ['guest', 'about'],
    label: 'BIO OR SOCIAL URL',
  },
  {
    name: ['guest', 'picture'],
    label: 'HEADSHOT URL OR UPLOAD',
  },
];

const topicLabels = ['TOPIC OR STORY1', 'TOPIC OR STORY2'];

const pollInfoFields = [
  {
    name: 'hostOfferUrl',
    label: 'HOST OFFER URL',
  },
  {
    name: 'guestOfferUrl',
    label: 'GUEST OFFER URL',
  },
];

export default function NewAutomation({ isGuestAcceptance = false }) {
  const [form] = Form.useForm();

  const { id } = useParams();
  const dispatch = useDispatch();

  const isNew = id === undefined; // new automation
  const guestTypeValue = Form.useWatch('guestType', form);

  const { guest, isLoading } = useSelector((state) => state.guests);
  const {
    recordingDate = null,
    guest: guestUser,
    guestType = HOST_GUEST,
    potentialTopics = ['', ''],
    startHostAutomation = false,
    hostOfferUrl = null,
    guestOfferUrl = null,
  } = guest || {};
  console.log(guest, id, isNew, guestTypeValue);

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
    potentialTopics,
    startHostAutomation,
    guestType,
    email: guestUser?.email,
    fullName: guestUser?.lastName ? `${guestUser?.firstName} ${guestUser?.lastName}` : null,
    cellPhone: guestUser ? guestUser.profile?.phone : '',
    linkedinUrl: guestUser ? guestUser.socialAccounts?.linkedin?.profileLink : '',
    recordingDate: recordingDate ? dayjs(recordingDate, 'YYYY/MM/DD') : null,
    hostOfferUrl,
    guestOfferUrl
  };

  const guestTypeOptions = [
    { key: HOST_GUEST, value: HOST_GUEST, label: 'HOST A GUEST' },
    { key: SOLO_SESSION, value: SOLO_SESSION, label: 'SOLO SESSION' },
    { key: GUEST_SPEAKER, value: GUEST_SPEAKER, label: "I'M A GUEST SPEAKER" },
  ];

  const getText = () => {
    switch (guestTypeValue) {
      case HOST_GUEST:
        return 'Guest Info';
      case SOLO_SESSION:
        return 'Solo Info';
      default:
        return 'Host Info';
    }
  };

  return (
    <>
      {!isGuestAcceptance && <AppTitle title={`${isNew ? 'New' : 'Update'} Automation`} />}

      <div className="add-guest">
        <Title className="m-0">AUTOMATE POLL SHARING</Title>
        <Title level={5} className="fw-400" type="secondary">
          Pull in more interest when your upplaud poll is posted automatically.
        </Title>
      </div>

      <Form
        form={form}
        size="large"
        colon={false}
        labelAlign="left"
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 15 }}
        initialValues={initialValues}
        onFinish={(data) => {
          data.recordingDate = dayjs(data?.recordingDate).format();
          console.log(data)
          if (isNew) {
            dispatch(addGuest(data));
          } else {
            dispatch(updateGuest(id, data));
          }
        }}
      >
        <Form.Item name="guestType">
          <Radio.Group options={guestTypeOptions} />
        </Form.Item>

        <Form.Item
          name="recordingDate"
          className="w-50"
          label={<div className="pt-10px">Poll End Date:</div>}
        >
          <DatePicker className="w-50 ml-0" bordered={false} />
        </Form.Item>

        <div className="flex-item gap-2">
          <div className="flex-1">
            <Title level={5}>{getText()}</Title>
            {hostInfoFields.map((fieldName) => (
              <Form.Item
                key={fieldName.label}
                name={fieldName.name}
                label={<div className="pt-10px">{fieldName.label}:</div>}
              >
                <Input placeholder={fieldName.label} />
              </Form.Item>
            ))}
          </div>

          <div className="flex-1">
            <Title level={5}>Poll Info</Title>
            <Form.Item>
              (Use AI to generate topics; see <u>video tutorial</u>)
            </Form.Item>
            {topicLabels.map((label, index) => (
              <Form.Item
                key={index}
                name={['potentialTopics', index]}
                label={<div className="pt-10px">{label}:</div>}
              >
                <Input placeholder={label} />
              </Form.Item>
            ))}

            {pollInfoFields.map((fieldName) => {
              return (
                <Form.Item
                  key={fieldName.label}
                  name={fieldName.name}
                  label={<div className="pt-10px">{fieldName.label}:</div>}
                >
                  <Input placeholder={fieldName.label} />
                </Form.Item>
              );
            })}
          </div>
        </div>

        <PollSharingImage />

        <SocialPostingItem />

        {guestTypeValue !== SOLO_SESSION && (
          <div className="flex-item mt-4">
            <Text strong>POSTING STARTS NOW</Text>
            <Form.Item name="startHostAutomation" className="m-0">
              <Switch />
            </Form.Item>
            <Text type="secondary">Start when they starts</Text>
          </div>
        )}

        <Space size={30} className="mt-4">
          <Button>SAVE DRAFT</Button>
          <Button type="primary" htmlType="submit">
            LAUNCH POLL AUTOMATION
          </Button>
        </Space>
      </Form>
    </>
  );
}
