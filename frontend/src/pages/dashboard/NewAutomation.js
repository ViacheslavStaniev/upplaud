import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GUEST_TYPE } from '../../utils/types';
import { useSelector, useDispatch } from 'react-redux';
import { CalendarOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { addGuest, fetchGuest, updateGuest, updateState } from '../../reducers/guestsSlice';
import {
  Form,
  Space,
  Input,
  Button,
  DatePicker,
  Typography,
  Radio,
  Collapse,
  Select,
  Divider,
  Switch,
  ColorPicker,
} from 'antd';
import AppTitle from '../../components/AppTitle';
import SocialPostingItem from './SocialPostingItem';
import PollSharingImage from './PollSharingImage';

const { Panel } = Collapse;
const { Option } = Select;
const { Text, Title } = Typography;

const { HOST_GUEST, SOLO_SESSION, GUEST_SPEAKER } = GUEST_TYPE;

const tableConfig = [
  {
    label: 'LOGO IMAGE FROM:',
    selectOptions: [{ value: 'default', label: 'Default name' }],
    buttonLabel: 'ADD NEW IMAGE',
    buttonIcon: <PlusOutlined />,
    previewLabel: 'PREVIEW SELECTION',
  },
  {
    label: 'HEADLINE HOOK:',
    selectOptions: [{ value: 'list', label: 'List' }],
    buttonLabel: 'ADD NEW HOOK',
    buttonIcon: <PlusOutlined />,
    colorLabel: 'HEADLINE BG COLOR',
    textColorLabel: 'HEADLINE TEXT COLOR',
  },
  {
    label: 'FOOTER HOOK:',
    selectOptions: [{ value: 'list', label: 'List' }],
    buttonLabel: 'ADD NEW ACTION',
    buttonIcon: <PlusOutlined />,
    colorLabel: 'FOOTER BG COLOR',
    textColorLabel: 'FOOTER TEXT COLOR',
  },
];

const hostInfoFields = [
  {
    name: 'fullName',
    label: 'FULL NAME',
  },
  {
    name: 'cellPhone',
    label: 'CELL PHONE',
  },
  {
    name: 'email',
    label: 'EMAIL ADDRESS',
  },
  {
    name: 'about',
    label: 'BIO OR SOCIAL URL',
  },
  {
    name: 'picture',
    label: 'HEADSHOT URL OR UPLOAD',
  },
];

const pollInfoFields = [
  {
    name: 'potentialTopics1',
    label: 'TOPIC OR STORY1',
  },
  {
    name: 'potentialTopics2',
    label: 'TOPIC OR STORY2',
  },
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

  const [isAcc1Open, setIsAcc1Open] = useState(false);
  const [isAcc2Open, setIsAcc2Open] = useState(false);

  const isNew = id === 'new'; // new automation
  const guestTypeValue = Form.useWatch('guestType', form);

  const { guest, isLoading } = useSelector((state) => state.guests);
  const {
    recordingDate = null,
    guest: guestUser,
    freebieUrl = '',
    withGuest = true,
    potentialTopics = ['', ''],
    startHostAutomation = false,
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
    withGuest,
    freebieUrl,
    potentialTopics,
    startHostAutomation,
    guestType: HOST_GUEST,
    email: guestUser?.email,
    lastName: guestUser?.lastName,
    firstName: guestUser?.firstName,
    cellPhone: guestUser ? guestUser.profile?.phone : '',
    linkedinUrl: guestUser ? guestUser.socialAccounts?.linkedin.profileLink : '',
    recordingDate: recordingDate ? dayjs(recordingDate, 'YYYY/MM/DD') : null,
  };

  const toggleAccordion = (accordionIndex, setIsOpen) => () => {
    if (accordionIndex === 1) setIsAcc1Open(!isAcc1Open);
    if (accordionIndex === 2) setIsAcc2Open(!isAcc2Open);
  };

  const guestTypeOptions = [
    { key: HOST_GUEST, value: HOST_GUEST, label: 'HOST A GUEST' },
    { key: SOLO_SESSION, value: SOLO_SESSION, label: 'SOLO SESSION' },
    { key: GUEST_SPEAKER, value: GUEST_SPEAKER, label: "I'M A GUEST SPEAKER" },
  ];

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
          console.log('formdata', data);
          return;
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
          className='w-50'
          label={
            <div className="pt-10px">
              Poll End Date: <CalendarOutlined />
            </div>
          }
        >
          <DatePicker className="w-50 ml-0" bordered={false} />
        </Form.Item>

        <div className="flex-item gap-2">
          <div className="flex-1">
            <Title level={5}>{guestTypeValue === HOST_GUEST ? 'Host Info' : 'Guest Info'}</Title>
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
            {pollInfoFields.map((fieldName) => (
              <Form.Item
                key={fieldName.label}
                name={fieldName.name}
                label={<div className="pt-10px">{fieldName.label}:</div>}
              >
                <Input placeholder={fieldName.label} />
              </Form.Item>
            ))}
          </div>
        </div>

        <PollSharingImage />

        <SocialPostingItem />

        <div className="flex-item mt-4">
          <Text strong>POSTING STARTS NOW</Text>
          <Switch />
          <Text type="secondary">Start when guest starts</Text>
        </div>

        <Space size={30} className="mt-4">
          <Button>SAVE DRAFT</Button>
          <Button type="primary">LAUNCH POLL AUTOMATION</Button>
        </Space>
      </Form>
    </>
  );
}
