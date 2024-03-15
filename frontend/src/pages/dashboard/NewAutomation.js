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
  Row,
  Col,
  List,
  Form,
  Space,
  Input,
  Radio,
  Steps,
  Button,
  Switch,
  DatePicker,
  Typography,
} from 'antd';
import AppTitle from '../../components/AppTitle';
import TextEditor from '../../components/TextEditor';
import HeadshotImage from '../layouts/HeadshotImage';
import PollSharingImage from './layouts/PollSharingImage';
import SocialPostingItem from './layouts/SocialPostingItem';
import AutomationCongrats from './layouts/AutomationCongrats';

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
  {
    required: true,
    name: 'presentationName',
    label: 'Name of presentation or podcast',
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
  const { guest, error, isLoading, isPublished, isPublishing } = useSelector(
    (state) => state.guests
  );

  const {
    audio = null,
    socials = [],
    guest: guestUser,
    pollImageSrc = '',
    pollImageInfo = null,
    hostOfferUrl = null,
    guestOfferUrl = null,
    recordingDate = null,
    presentationName = '',
    guestType = HOST_GUEST,
    hostSpeakerLabel = '',
    guestSpeakerLabel = '',
    socialShareFileSrc = '',
    potentialTopics = ['', ''],
    startHostAutomation = false,
    emailTemplate = {
      subject: '[PRESENTATION_NAME] NEXT STEPS',
      body: `<blockquote>Hi [GUEST_FIRSTNAME], it's [USER_FULLNAME]. (To reach me, please reply all.) I use Upplaud to grow my audience; you can use it at no cost to reach more people too:</blockquote><blockquote>Can we post on our LinkedIn &amp; Facebook about [PODCAST / PRESENTATION NAME] before we do it? Upplaud makes it easy &amp; engaging. (See your private link &amp; password at the end.)</blockquote><blockquote>Here's how Upplaud grows our audience:</blockquote><blockquote>Instead of guessing what others want to know from both of us... Let's ask them! I chose 2 possible topics for our connections to vote on. They can even suggest their own topics privately.</blockquote><blockquote>I've already setup everything, including voting invitation posts for our Facebook &amp; LinkedIn. (It doesn't matter how active you are: Influencers on social media love engaging like this, and will share you with more people!)</blockquote><blockquote>We can also share our Upplaud voting page through email &amp; elsewhere. All you need to do is click the Grow Audience link below. It only takes a few seconds to connect your LinkedIn and/or Facebook to Upplaud. (I've connected mine already.)</blockquote><blockquote>Thanks for doing this now (and not procrastinating!) Every day counts to grow our audience: More time for more votes, more shares &amp; more results.</blockquote><blockquote>The link to click is below my name (be sure to reference your Private Password, to securely connect your social media). I'm excited to grow together.</blockquote><blockquote><br></blockquote><blockquote>Thanks again, see you soon. - [USER_FIRSTNAME]</blockquote><p><br></p>`,
    },
  } = guest || {};
  console.log('guest', guest);

  // Default Socials Items
  const defaultSocials = getSocialsItems(user?.socialAccounts || []);

  useEffect(() => {
    // Get files
    dispatch(getFiles());

    if (!isNew && id) dispatch(fetchGuest(id));

    if (isNew) dispatch(updateState({ guest: null, isPublished: false }));

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
    emailTemplate,
    guestOfferUrl,
    potentialTopics,
    presentationName,
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
  };

  const onFormSubmit = (status) => {
    form
      .validateFields()
      .then((values) => {
        values.status = status;
        values.recordingDate = dayjs(values?.recordingDate).format();

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

          {pollInfoFields.map(({ name, label, required = false }, i) => {
            return (
              <Form.Item
                key={label}
                name={name}
                label={label}
                rules={[{ required }]}
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
            <Form.Item name={['emailTemplate', 'subject']} wrapperCol={24}>
              <Input placeholder="Subject" />
            </Form.Item>

            <Paragraph strong className="mb-1">
              Body
            </Paragraph>
            <TextEditor
              name={['emailTemplate', 'body']}
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
                '[PRESENTATION_NAME]',
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
            <Button onClick={() => setCurrentStep((c) => c - 1)}>Back</Button>

            <Button
              loading={isLoading && !isPublishing}
              onClick={() => onFormSubmit(POLL_STATUS.DRAFT)}
            >
              SAVE DRAFT
            </Button>
            <Button
              type="primary"
              loading={isLoading && isPublishing}
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

        {!isPublished && (
          <Title level={5} className="fw-400" type="secondary">
            Pull in more interest when your upplaud automation is posted automatically.
          </Title>
        )}
      </div>

      {!isPublished && (
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
                <Button onClick={() => setCurrentStep((c) => c - 1)}>Back</Button>
              )}
            </div>
          )}
        </Form>
      )}

      {isPublished && (
        <AutomationCongrats
          guest={guest}
          showActionBtns
          onGoBack={() => dispatch(updateState({ isPublished: false }))}
        />
      )}
    </div>
  );
}
