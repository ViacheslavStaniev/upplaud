import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { getFiles } from '../../reducers/fileSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useAuthContext } from '../../auth/AuthProvider';
import { useParams, useNavigate } from 'react-router-dom';
import { GUEST_TYPE, POLL_STATUS } from '../../utils/types';
import { pollTypeOptions, getPollType, getSocialsItems } from '../../utils/common';
import { addGuest, fetchGuest, updateGuest, updateState } from '../../reducers/guestsSlice';
import {
  List,
  Form,
  Space,
  Input,
  Button,
  DatePicker,
  Typography,
  Radio,
  Switch,
  Steps,
  Row,
  Col,
} from 'antd';
import AppTitle from '../../components/AppTitle';
import TextEditor from '../../components/TextEditor';
import HeadshotImage from '../layouts/HeadshotImage';
import PollSharingImage from './layouts/PollSharingImage';
import SocialPostingItem from './layouts/SocialPostingItem';

const { Text, Title, Paragraph } = Typography;
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

  const [currentStep, setCurrentStep] = useState(1);

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
    guestType,
    pollImageSrc,
    hostOfferUrl,
    guestOfferUrl,
    potentialTopics,
    hostSpeakerLabel,
    guestSpeakerLabel,
    socialShareFileSrc,
    startHostAutomation,
    audio: audio?._id || null,
    audioDuration: audio?.duration || 0,
    guest: getGuesUsertObj(guestUser),
    socials: socials.length > 0 ? socials : defaultSocials,
    pollSharingImage: getPostSharingImageInfo(pollImageInfo),
    recordingDate: recordingDate ? dayjs(recordingDate, 'YYYY/MM/DD') : null,
    invite: {
      email: {
        subject: '',
        body: `Hi [GUEST_FIRSTNAME], it's [USER_FULLNAME]. [CUSTOMIZE THE FOLLOWING PHRASING & REMOVE THIS RED TEXT: I'm looking forward to featuring you on my podcast, "Branded Expert." Let's grow the audience even before we record. Here's how we'll increase your reach:
        We should start building interest in what we'll talk about now itself. We don't have to finalize our talking points yet: Instead of guessing what others want to know from us... Let's ask them (using social media & email).
        I chose 2 possible topics for our connections to vote on. They can even privately suggest their own topics for us.
        I've already setup everything through a website called Upplaud. It'll post on our Facebook and LinkedIn, inviting our connections to vote. 
        It doesn't matter how active you are on social media: People on Facebook & LinkedIn love participating like this (and will even share you with others). We can even share our Upplaud through email, etc. 
        All you need to do is click the button below. Upplaud will post on our social media, inviting our connections to vote on the topics. (I've already connected my Facebook & LinkedIn.)
        It only takes a few seconds to do. Thanks for doing it now: Every day counts to grow our audience interest. More time for more votes, more shares & more results.
        The button to click is right below my name (be sure to save the Private Invite Password, since only you can connect & toggle your social media). I'm happy we're growing this together!
        Thanks, see you soon.
        - [USER_FIRSTNAME]
        `,
      },
    },
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

  const stepItems = [
    {
      title: 'Got your info',
      className: 'pointer-none',
      content: <span>current-user-details</span>,
    },
    {
      title: 'Guest info',
      content: (
        <>
          <Title level={5}>{getPollType(guestTypeValue)?.text}</Title>

          {hostInfoFields.map(({ label, name, rules = null }) => (
            <Form.Item key={label} name={name} label={label} rules={isSoloSession ? null : rules}>
              <Input placeholder={label} disabled={isSoloSession} />
            </Form.Item>
          ))}

          <Form.Item name={['guest', 'picture']} label="HEADSHOT IMAGE" className="m-0">
            <HeadshotImage
              picture={Form.useWatch(['guest', 'picture'], form)}
              onChange={(picture) => form.setFieldValue(['guest', 'picture'], picture)}
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Topics info',
      content: (
        <>
          <Title level={5}>Automation Info</Title>

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

          {pollInfoFields.map(({ name, label }, i) => {
            return (
              <Form.Item
                key={label}
                name={name}
                label={label}
                className={pollInfoFields.length - 1 === i ? 'm-0' : ''}
              >
                <Input placeholder={label} />
              </Form.Item>
            );
          })}
        </>
      ),
    },
    {
      title: 'Voter invites',
      content: (
        <>
          <PollSharingImage />
          <SocialPostingItem />
        </>
      ),
    },
    {
      title: 'Guest invites',
      content: (
        <Row gutter={[24]}>
          <Col span={18}>
            <Title level={4} className="mt-0">
              Invite Email
            </Title>

            <Paragraph strong className="mb-1">
              Subject
            </Paragraph>
            <Form.Item name={['invite', 'email', 'subject']} wrapperCol={24}>
              <Input placeholder="Subject" />
            </Form.Item>

            <Paragraph strong className="mb-1">
              Body
            </Paragraph>
            <TextEditor
              name={['invite', 'email', 'body']}
              placeholder="Enter your text here..."
              formItemParams={{ className: 'm-0', wrapperCol: 24 }}
            />
          </Col>
          <Col span={6}>
            <Title level={5} className="mt-0">
              Short Codes
            </Title>

            <List
              bordered
              size="small"
              itemLayout="horizontal"
              renderItem={(item) => <List.Item>{item}</List.Item>}
              dataSource={[
                '[USER_FIRSTNAME]',
                '[USER_LASTNAME]',
                '[USER_FULLNAME]',
                '[GUEST_FIRSTNAME]',
                '[GUEST_LASTNAME]',
                '[GUEST_FULLNAME]',
              ]}
            />
          </Col>
        </Row>
      ),
    },
    {
      title: 'UPPLAUD LAUNCH',
      content: (
        <>
          <Form.Item
            className="w-50 mt-4"
            name="recordingDate"
            label="Automation End Date"
            rules={[{ required: true }]}
          >
            <DatePicker
              className="w-75 ml-0"
              disabledDate={(d) =>
                d && (d < dayjs().subtract(1, 'day') || d > dayjs().add(1, 'years'))
              }
            />
          </Form.Item>

          <div className="flex-item">
            <Form.Item
              className="m-0"
              valuePropName="checked"
              label="POSTING STARTS NOW"
              name="startHostAutomation"
              labelCol={{ span: 20 }}
            >
              <Switch disabled={isSoloSession} />
            </Form.Item>
            <Text type="secondary" className="ml-1">
              Start when they starts
            </Text>
          </div>

          <Space size={20} className="mt-4">
            <Button onClick={() => setCurrentStep((c) => c - 1)}>Previous Step</Button>

            <Button loading={isLoading} onClick={() => onFormSubmit(POLL_STATUS.DRAFT)}>
              SAVE DRAFT
            </Button>
            <Button
              type="primary"
              loading={isLoading}
              onClick={() => onFormSubmit(POLL_STATUS.PUBLISHED)}
            >
              LAUNCH AUTOMATION
            </Button>
          </Space>
        </>
      ),
    },
  ];

  return (
    <div className="automation-form">
      {!isGuestAcceptance && <AppTitle title={`${isNew ? 'New' : 'Update'} Automation`} />}

      <div className="add-guest">
        <Title className="m-0">NEW UPPLAUD AUTOMATION</Title>
        <Title level={5} className="fw-400" type="secondary">
          Pull in more interest when your upplaud automation is posted automatically.
        </Title>
      </div>

      <Form
        form={form}
        size="large"
        labelWrap={true}
        labelAlign="left"
        layout="horizontal"
        // requiredMark={false}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 17 }}
        initialValues={initialValues}
      >
        <Form.Item hidden name="pollImageSrc" label="Poll Image">
          <Input placeholder="Poll Image" />
        </Form.Item>

        <Form.Item hidden name="socialShareFileSrc" label="Social Share File">
          <Input placeholder="Social Share File" />
        </Form.Item>

        <Form.Item name="guestType" className="mb-1">
          <Radio.Group options={pollTypeOptions} />
        </Form.Item>

        <Title level={4} className="mt-0">
          Quick Steps:
        </Title>
        <Steps current={currentStep} items={stepItems} onChange={setCurrentStep} />

        {stepItems.map((item, index) => (
          <div
            key={index}
            className="mt-2 mb-2"
            style={{ display: currentStep === index ? 'block' : 'none' }}
          >
            {item?.content}
          </div>
        ))}

        {/* <div className="mt-2 mb-2">{stepItems[currentStep]?.content}</div> */}

        {currentStep !== stepItems.length - 1 && (
          <div className="flex-item gap-1 flex-center">
            {currentStep < stepItems.length - 1 && (
              <Button
                type="primary"
                onClick={() => {
                  // form
                  //   .validateFields()
                  //   .then(() => setCurrentStep((c) => c + 1))
                  //   .catch(console.log);
                  setCurrentStep((c) => c + 1);
                }}
              >
                Next Step
              </Button>
            )}

            {currentStep > 1 && (
              <Button onClick={() => setCurrentStep((c) => c - 1)}>Previous Step</Button>
            )}
          </div>
        )}
      </Form>
    </div>
  );
}
