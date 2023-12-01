import dayjs from 'dayjs';
import { useEffect } from 'react';
import { getFiles } from '../../reducers/fileSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useAuthContext } from '../../auth/AuthProvider';
import { useParams, useNavigate } from 'react-router-dom';
import { GUEST_TYPE, POLL_STATUS } from '../../utils/types';
import { pollTypeOptions, getPollType, getSocialsItems } from '../../utils/common';
import { addGuest, fetchGuest, updateGuest, updateState } from '../../reducers/guestsSlice';
import { Form, Space, Input, Button, DatePicker, Typography, Radio, Switch } from 'antd';
import AppTitle from '../../components/AppTitle';
import HeadshotImage from '../layouts/HeadshotImage';
import PollSharingImage from './layouts/PollSharingImage';
import SocialPostingItem from './layouts/SocialPostingItem';

const { Text, Title } = Typography;
const { HOST_GUEST, SOLO_SESSION } = GUEST_TYPE;

const hostInfoFields = [
  {
    label: 'FULL NAME',
    name: ['guest', 'fullName'],
    rules: [{ required: true }],
  },
  {
    label: 'CELL PHONE',
    name: ['guest', 'phone'],
  },
  {
    label: 'EMAIL ADDRESS',
    name: ['guest', 'email'],
    rules: [{ required: true }],
  },
  {
    name: ['guest', 'about'],
    label: 'BIO OR SOCIAL URL',
  },
  {
    name: ['guest', 'jobTitle'],
    label: 'JOB TITLE',
  },
  {
    name: ['guest', 'organization'],
    label: 'ORGANIZATION',
  },
];

const topicLabels = ['TOPIC OR STORY1', 'TOPIC OR STORY2'];

const pollInfoFields = [
  {
    name: 'hostSpeakerLabel',
    label: 'YOUR SPEAKER LABEL',
  },
  {
    name: 'guestSpeakerLabel',
    label: 'THEIR SPEAKER LABEL',
  },
  {
    name: 'hostOfferUrl',
    label: 'YOUR REWARD URL',
  },
  {
    name: 'guestOfferUrl',
    label: 'THEIR REWARD URL',
  },
];

const getGuesUsertObj = (userObj = null) => {
  return {
    email: userObj?.email,
    phone: userObj ? userObj.profile?.phone : '',
    about: userObj ? userObj?.profile?.about : '',
    picture: userObj ? userObj?.profile?.picture : '',
    jobTitle: userObj ? userObj?.profile?.jobTitle : '',
    organization: userObj ? userObj?.profile?.organization : '',
    fullName: userObj ? `${userObj?.firstName} ${userObj?.lastName}` : '',
  };
};

const getPostSharingImageInfo = (obj) => {
  const { logo, header = null, footer = null } = obj || {};

  return {
    logo,
    headerText: (header && header?.text) || '',
    headerBgColor: (header && header?.bgColor) || '#1677FF',
    headerTextColor: (header && header.textColor) || '#FFFFFF',
    footerText: (footer && footer?.text) || '',
    footerBgColor: (footer && footer?.bgColor) || '#1677FF',
    footerTextColor: (footer && footer?.textColor) || '#FFFFFF',
  };
};

export default function NewAutomation({ isGuestAcceptance = false }) {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const isNew = id === undefined; // new automation
  const guestTypeValue = Form.useWatch('guestType', form);

  const isSoloSession = guestTypeValue === SOLO_SESSION;
  const { guest, error, isLoading } = useSelector((state) => state.guests);

  const {
    audio = null,
    socials = [],
    guest: guestUser,
    pollImageSrc = '',
    pollImageInfo = null,
    hostOfferUrl = null,
    guestOfferUrl = null,
    recordingDate = null,
    guestType = HOST_GUEST,
    hostSpeakerLabel = '',
    guestSpeakerLabel = '',
    socialShareFileSrc = '',
    potentialTopics = ['', ''],
    startHostAutomation = false,
  } = guest || {};
  console.log('guest', guest);

  // Default Socials Items
  const defaultSocials = getSocialsItems(user?.socialAccounts || []);

  useEffect(() => {
    // Get files
    dispatch(getFiles());

    if (!isNew && id) dispatch(fetchGuest(id));

    return () => dispatch(updateState({ guest: null }));
  }, [isNew, id, dispatch]);

  useEffect(() => {
    guest && form.resetFields();

    return () => form.resetFields();
  }, [guest, form]);

  useEffect(() => {
    const { email, phone, about, picture, fullName } = getGuesUsertObj(
      isSoloSession ? user : guestUser
    );

    form.setFieldsValue({ guest: { email, phone, about, picture, fullName } });
  }, [user, guestUser, form, isSoloSession]);

  // Handle Error
  useEffect(() => {
    if (error && error.status === 403) navigate('/403');

    return () => dispatch(updateState({ error: null }));
  }, [error, navigate, dispatch]);

  const initialValues = {
    audio,
    guestType,
    pollImageSrc,
    hostOfferUrl,
    guestOfferUrl,
    potentialTopics,
    hostSpeakerLabel,
    guestSpeakerLabel,
    socialShareFileSrc: '64ffe6a8f2e75529c85200bd/videos/Video_1701451254106.mp4',
    startHostAutomation,
    guest: getGuesUsertObj(guestUser),
    socials: socials.length > 0 ? socials : defaultSocials,
    pollSharingImage: getPostSharingImageInfo(pollImageInfo),
    recordingDate: recordingDate ? dayjs(recordingDate, 'YYYY/MM/DD') : null,
  };

  const onFormSubmit = (status) => {
    form
      .validateFields()
      .then((values) => {
        values.status = status;
        values.recordingDate = dayjs(values?.recordingDate).format();
        console.log(values, isNew);

        if (isNew) {
          dispatch(addGuest(values));
        } else {
          dispatch(updateGuest(id, values));
        }
      })
      .catch(console.log);
  };

  return (
    <div className="automation-form">
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
        labelWrap={true}
        labelAlign="left"
        layout="horizontal"
        requiredMark={false}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 15 }}
        initialValues={initialValues}
      >
        <Form.Item hidden name="pollImageSrc" label="Poll Image">
          <Input placeholder="Poll Image" />
        </Form.Item>

        <Form.Item hidden name="socialShareFileSrc" label="Social Share File">
          <Input placeholder="Social Share File" />
        </Form.Item>

        <Form.Item name="guestType">
          <Radio.Group options={pollTypeOptions} />
        </Form.Item>

        <Form.Item
          className="w-50"
          name="recordingDate"
          label="Poll End Date"
          rules={[{ required: true }]}
        >
          <DatePicker
            className="w-75 ml-0"
            disabledDate={(d) =>
              d && (d < dayjs().subtract(1, 'day') || d > dayjs().add(1, 'years'))
            }
          />
        </Form.Item>

        <div className="d-flex gap-2">
          <div className="flex-1">
            <Title level={5}>{getPollType(guestTypeValue)?.text}</Title>

            {hostInfoFields.map(({ label, name, rules = null }) => (
              <Form.Item key={label} name={name} label={label} rules={isSoloSession ? null : rules}>
                <Input placeholder={label} disabled={isSoloSession} />
              </Form.Item>
            ))}

            <Form.Item name={['guest', 'picture']} label="HEADSHOT IMAGE">
              <HeadshotImage
                picture={Form.useWatch(['guest', 'picture'], form)}
                onChange={(picture) => form.setFieldValue(['guest', 'picture'], picture)}
              />
            </Form.Item>
          </div>

          <div className="flex-1">
            <Title level={5}>Poll Info</Title>

            {topicLabels.map((label, index) => (
              <Form.Item
                key={index}
                label={label}
                rules={[{ required: true }]}
                name={['potentialTopics', index]}
              >
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

        <div className="flex-item mt-4">
          <Text strong>POSTING STARTS NOW</Text>
          <Form.Item name="startHostAutomation" valuePropName="checked" className="m-0">
            <Switch disabled={isSoloSession} />
          </Form.Item>
          <Text type="secondary">Start when they starts</Text>
        </div>

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
    </div>
  );
}
