import Logo from '../../components/Logo';
import AppTitle from '../../components/AppTitle';
import SocialMediaConnect from './SocialMediaConnect';
import LoadingScreen from '../../components/LoadingScreen';
import SocialPostingItem from './layouts/SocialPostingItem';
import { useState, useEffect } from 'react';
import { getFullPath } from '../../routes/paths';
import { useParams, Navigate, Link } from 'react-router-dom';
import { getDateString, getSocialsItems } from '../../utils/common';
import { getPoll, getSocials, saveSocials, updatePoll } from '../../reducers/guestsSlice';
import {
  App,
  Row,
  Col,
  Card,
  List,
  Form,
  Input,
  Modal,
  Button,
  Avatar,
  Typography,
  ConfigProvider,
} from 'antd';

const { Text, Title, Paragraph } = Typography;

export default function GuestAcceptance() {
  const { guestId } = useParams();

  const [state, setState] = useState({
    poll: null,
    errorMsg: '',
    loading: false,
    validatedPolls: {},
    passwordValidated: false,
  });
  const { poll, errorMsg, loading, validatedPolls, passwordValidated } = state;
  const guest = poll?.guest || {};

  const updateState = (data) => setState((d) => ({ ...d, ...data }));

  useEffect(() => {
    if (guestId) {
      const validatedPolls = JSON.parse(window.localStorage.getItem('validatedPolls')) || {};
      const passwordValidated = validatedPolls[guestId] || false;

      // Fetch Poll
      updateState({ loading: true, passwordValidated, validatedPolls });
      getPoll(guestId)
        .then((poll) => updateState({ poll }))
        .catch(console.error)
        .finally(() => updateState({ loading: false }));
    }

    return () => {
      updateState({ poll: null, loading: false });
    };
  }, [guestId]);

  if (loading) return <LoadingScreen />;
  if (!guestId) return <Navigate to="/404" />;

  return (
    <ConfigProvider theme={{ token: { fontSize: 16 } }}>
      <AppTitle title="Guest Acceptance" />

      <Row className="h-100vh guest-acceptance">
        <Col span={5} className="p-2 leftbg">
          <Logo rootClassName="sidebar-navlogo" />

          <div className="bg-white p-2 br-8px mt-2">
            <Title level={3} className="text-center color-36c102">
              How does Upplaud grow our audience?
            </Title>
            <Title level={5}>It's proven that when we ask others for input, we get to:</Title>
            <List
              size="small"
              className="mb-4"
              dataSource={[
                '- Make them feel part of us',
                '- Give them what they want.',
                "- They'll share us more:",
                '- We grow our reach & impact',
                '- We do business better!',
              ]}
              renderItem={(item) => <List.Item className="border-0">{item}</List.Item>}
            />

            <Paragraph>
              Upplaud captures voter referrals, email addresses & offers rewards to voters; while
              pulling interest from multiple sources: Co-presenters' Facebook, LinkedIn, email,
              presentations, etc.
            </Paragraph>
          </div>
        </Col>

        <Col span={19} className="p-4">
          {poll && guest && <ConnectSocialsInfo poll={poll} guest={guest} />}
        </Col>
      </Row>

      <Modal
        footer={false}
        closable={false}
        maskClosable={false}
        open={!passwordValidated}
        styles={{ mask: { backgroundColor: '#fdeffff0' } }}
      >
        <div className="p-2">
          <Title level={3} className="mt-0">
            Password Required!
          </Title>

          {errorMsg && <Paragraph type="danger">{errorMsg}</Paragraph>}

          <Form
            size="large"
            layout="vertical"
            initialValues={{ password: '' }}
            onFinish={({ password = '' }) => {
              if (password?.trim() === poll?.password) {
                const newValidatedPolls = { ...validatedPolls, [guestId]: true };
                window.localStorage.setItem('validatedPolls', JSON.stringify(newValidatedPolls));
                updateState({ passwordValidated: true, newValidatedPolls });
              } else updateState({ errorMsg: 'Invalid password!' });
            }}
          >
            <Form.Item name="password" label="Enter your password">
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
}

function ConnectSocialsInfo({ poll, guest }) {
  const [form] = Form.useForm();
  const { modal, notification } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const defaultSocials = getSocialsItems(guest?.socialAccounts || []);

  useEffect(() => {
    setLoading(true);
    getSocials(guest?._id, poll?._id)
      .then((socials) => {
        form.setFieldsValue({ socials: socials?.length > 0 ? socials : defaultSocials });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guest?._id, poll?._id]);

  const onGuestOfferSave = ({ guestOfferUrl }) => {
    setLoading2(true);

    updatePoll(poll?._id, { guestOfferUrl })
      .then(({ msg }) => notification.success({ message: 'Success', description: msg }))
      .catch((err) => notification.error({ message: 'Error', description: err?.message }))
      .finally(() => setLoading2(false));
  };

  return (
    <div className="guest-acceptance-content">
      <Title level={2} className="color-6b0d88 fw-600 m-0 mb-2">
        Hi {guest?.firstName}, I'm looking forward to doing {poll?.presentationName || 'an event'}{' '}
        with you!
      </Title>

      <Title level={3} className="m-0 mb-2">
        Let's grow the best audience for us…
      </Title>

      <Title level={3} className="m-0 mb-2">
        By inviting our connections to vote & share our topics:
      </Title>

      <Card>
        <TitleText
          index={1}
          className="color-2196F3"
          title="Connect your social media (as I have already)..."
          avatarStyles={{ backgroundColor: '#2196f3', color: '#ffffff' }}
        />

        <SocialMediaConnect
          user={guest}
          btnSize="default"
          showTitle={false}
          className="mb-4 mt-2"
        />

        <TitleText index={2} type="secondary" title="Optional: Reward for voting..." />

        <div className="flex-item gap-1 mb-4">
          <Text className="minw-fit-content">Website address of your gift offer:</Text>

          <Form
            layout="inline"
            onFinish={onGuestOfferSave}
            className="flex-item gap-1 flex-nowrap"
            initialValues={{ guestOfferUrl: poll?.guestOfferUrl }}
          >
            <Form.Item
              noStyle
              name="guestOfferUrl"
              rules={[{ required: true, message: 'Please enter the offer url.' }]}
            >
              <Input type="url" placeholder="Enter your offer url" />
            </Form.Item>
            <Form.Item noStyle>
              <Button type="primary" htmlType="submit" loading={loading2}>
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>

        <TitleText
          index={3}
          type="secondary"
          title="Confirm: Posting frequency..."
          avatarStyles={{ backgroundColor: '#9e9e9e', color: '#ffffff' }}
        />

        <Paragraph>
          To reach the most people, we'll repeat our Upplaud until{' '}
          {getDateString(poll?.recordingDate)}:
        </Paragraph>

        <Form
          form={form}
          size="large"
          className="mb-4"
          labelWrap={true}
          labelAlign="left"
          layout="horizontal"
          initialValues={{ socials: defaultSocials }}
          onFinish={(values) => {
            setLoading(true);

            saveSocials(guest?._id, poll?._id, values.socials)
              .then(() =>
                modal.success({ title: 'Success', content: 'Socials saved successfully.' })
              )
              .catch((err) => modal.error({ title: 'Error', content: err?.message }))
              .finally(() => setLoading(false));
          }}
        >
          <SocialPostingItem />

          <Button loading={loading} type="primary" htmlType="submit" className="mt-2">
            SAVE
          </Button>
        </Form>

        <TitleText
          index={4}
          title="Grow even more interest..."
          avatarStyles={{ backgroundColor: '#000000', color: '#ffffff' }}
        />

        <Paragraph className="m-0">
          We should include the following Upplaud voting page in our email blasts, slides &
          elsewhere:{' '}
          <Link to={`/vote/${poll?.uniqueId}/${guest?.userName}`} target="_blank">
            {getFullPath(`/vote/${poll?.uniqueId}/${guest?.userName}`)}
          </Link>
        </Paragraph>
      </Card>
    </div>
  );
}

function TitleText({ title = '', index = 1, type = '', className = '', avatarStyles = {} }) {
  return (
    <Title type={type} level={4} className={`flex-item gap-1 ${className}`}>
      <Avatar size="small" style={avatarStyles}>
        {index}
      </Avatar>
      {title}
    </Title>
  );
}
