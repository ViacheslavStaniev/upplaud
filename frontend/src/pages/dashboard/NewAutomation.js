import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GUEST_TYPE, POLL_STATUS } from '../../utils/types';
import { useSelector, useDispatch } from 'react-redux';
import { addGuest, fetchGuest, updateGuest, updateState } from '../../reducers/guestsSlice';
import { Form, Space, Input, Button, DatePicker, Typography, Radio, Switch } from 'antd';
import AppTitle from '../../components/AppTitle';
import SocialPostingItem from './SocialPostingItem';
import PollSharingImage from './PollSharingImage';

const { Text, Link, Title } = Typography;
const { HOST_GUEST, SOLO_SESSION, GUEST_SPEAKER } = GUEST_TYPE;

const hostInfoFields = [
  {
    name: ['guest', 'fullName'],
    label: 'FULL NAME',
  },
  {
    name: ['guest', 'phone'],
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
    guest: guestUser,
    hostOfferUrl = null,
    guestOfferUrl = null,
    recordingDate = null,
    guestType = HOST_GUEST,
    potentialTopics = ['', ''],
    startHostAutomation = false,
  } = guest || {};

  useEffect(() => {
    if (!isNew && id) dispatch(fetchGuest(id));

    return () => dispatch(updateState({ guest: null }));
  }, [isNew, id, dispatch]);

  useEffect(() => {
    guest && form.resetFields();

    return () => form.resetFields();
  }, [guest, form]);

  const initialValues = {
    guestType,
    hostOfferUrl,
    guestOfferUrl,
    potentialTopics,
    startHostAutomation,
    recordingDate: recordingDate ? dayjs(recordingDate, 'YYYY/MM/DD') : null,
    guest: {
      email: guestUser?.email,
      phone: guestUser ? guestUser.profile?.phone : '',
      about: guestUser ? guestUser?.profile?.about : '',
      picture: guestUser ? guestUser?.profile?.picture : '',
      fullName: guestUser ? `${guestUser?.firstName} ${guestUser?.lastName}` : '',
    },
  };

  const guestTypeOptions = [
    { key: HOST_GUEST, value: HOST_GUEST, label: 'HOST A GUEST', text: 'Guest Info' },
    { key: SOLO_SESSION, value: SOLO_SESSION, label: 'SOLO SESSION', text: 'Solo Info' },
    { key: GUEST_SPEAKER, value: GUEST_SPEAKER, label: "I'M A GUEST SPEAKER", text: 'Host Info' },
  ];

  const getText = () => guestTypeOptions.find((item) => item.key === guestTypeValue)?.text;

  const onFormSubmit = (status) => {
    form.validateFields().then((values) => {
      values.status = status;
      values.recordingDate = dayjs(values?.recordingDate).format();
      console.log(values, isNew);

      if (isNew) {
        dispatch(addGuest(values));
      } else {
        dispatch(updateGuest(id, values));
      }
    });
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
        labelAlign="left"
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 15 }}
        className="automation-form"
        initialValues={initialValues}
      >
        <Form.Item name="guestType">
          <Radio.Group options={guestTypeOptions} />
        </Form.Item>

        <Form.Item className="w-50" name="recordingDate" label="Poll End Date">
          <DatePicker className="w-50 ml-0" bordered={false} />
        </Form.Item>

        <div className="flex-item gap-2">
          <div className="flex-1">
            <Title level={5}>{getText()}</Title>

            {hostInfoFields.map(({ label, name }) => (
              <Form.Item key={label} name={name} label={label}>
                <Input placeholder={label} />
              </Form.Item>
            ))}
          </div>

          <div className="flex-1">
            <Title level={5}>Poll Info</Title>

            <Form.Item>
              (Use AI to generate topics; see{' '}
              <Link href="#" target="_blank">
                video tutorial
              </Link>
              )
            </Form.Item>

            {topicLabels.map((label, index) => (
              <Form.Item key={index} label={label} name={['potentialTopics', index]}>
                <Input placeholder={label} />
              </Form.Item>
            ))}

            {pollInfoFields.map(({ name, label }) => {
              return (
                <Form.Item key={label} name={name} label={label}>
                  <Input placeholder={label} />
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
            <Form.Item name="startHostAutomation" className="m-0" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Text type="secondary">Start when they starts</Text>
          </div>
        )}

        <Space size={30} className="mt-4">
          <Button loading={isLoading} onClick={() => onFormSubmit(POLL_STATUS.DRAFT)}>
            SAVE DRAFT
          </Button>
          <Button
            type="primary"
            loading={isLoading}
            onClick={() => onFormSubmit(POLL_STATUS.PUBLISHED)}
          >
            LAUNCH POLL AUTOMATION
          </Button>
        </Space>
      </Form>
    </>
  );
}
