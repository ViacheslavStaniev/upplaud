import Logo from '../../components/Logo';
import AppTitle from '../../components/AppTitle';
import SocialMediaConnect from './SocialMediaConnect';
import LoadingScreen from '../../components/LoadingScreen';
import SocialPostingItem from './layouts/SocialPostingItem';
import PreviewAutomationVideo from './layouts/PreviewAutomationVideo';
import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getDateString, getSocialsItems } from '../../utils/common';
import { getPoll, getSocials, saveSocials } from '../../reducers/guestsSlice';
import {
  App,
  Row,
  Col,
  List,
  Form,
  Input,
  Modal,
  Space,
  Button,
  Divider,
  Typography,
  ConfigProvider,
} from 'antd';

const { Link, Title, Paragraph } = Typography;

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
        <Col span={6} className="p-4 leftbg">
          <Logo />

          <div style={{ marginTop: 50 }} className="bg-white p-2 br-8px">
            <Title level={3} className="text-center">
              Why does polling grow our audience?
            </Title>
            <Title level={5}>It’s proven that when we ask others for input, we get to:</Title>
            <List
              size="small"
              className="mb-4"
              dataSource={[
                '- Make them feel part of us',
                '- Give them what they want.',
                '- They’ll share us more:',
                '- We grow our reach & impact',
                '- We do business better!',
              ]}
              renderItem={(item) => <List.Item className="border-0">{item}</List.Item>}
            />

            <Paragraph>
              Upplaud makes polling & voting fast and easy, pulling together votes from multiple
              sources. We’re also able to capture referrals, email addresses, and offer gifts &
              rewards to voters.
            </Paragraph>
          </div>
        </Col>

        <Col span={18} className="p-50px">
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
  const { modal } = App.useApp();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const defaultSocials = getSocialsItems(guest?.socialAccounts || []);

  useEffect(() => {
    setLoading(true);
    getSocials(guest?._id, poll?._id)
      .then((socials) => {
        form.setFieldsValue({ socials: socials?.length > 0 ? socials : defaultSocials });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [guest?._id, poll?._id]);

  return (
    <>
      <Title className="color-6b0d88 fw-600 m-0 mb-2">
        Hi {guest?.firstName}, <strong>thank you</strong> for being our guest!
      </Title>

      <Title className="m-0 mb-2">Let’s grow the biggest audience for you...</Title>

      <Title level={2} className="m-0 mb-3">
        by asking our connections to vote on our topics.
      </Title>

      {/* <Paragraph italic>
        Optional: Watch our Upplaud <Link href="#">tutorial video</Link>
      </Paragraph> */}

      {/* <NewAutomation isGuestAcceptance /> */}

      <Title level={3} className="fw-400">
        Start polling each other’s social media:
      </Title>

      <SocialMediaConnect user={guest} showTitle={false} className="mb-2 mt-2" />

      <Space className="d-flex mb-4">
        <Link href={poll?.guestOfferUrl} target="_blank">
          Offer a free gift to voters
        </Link>
        <Divider type="vertical" className="border-000000" />
        <Link href={`/vote/${poll?._id}`} target="_blank">
          See our Upplaud voting page
        </Link>
        <Divider type="vertical" className="border-000000" />
        <PreviewAutomationVideo
          text="Preview posts"
          socialShareFileSrc={poll?.socialShareFileSrc}
        />
      </Space>

      <Paragraph>
        To reach the most people, we'll repeat our Upplaud until{' '}
        {getDateString(poll?.recordingDate)}:
      </Paragraph>

      <Form
        form={form}
        size="large"
        labelWrap={true}
        labelAlign="left"
        layout="horizontal"
        initialValues={{ socials: defaultSocials }}
        onFinish={(values) => {
          setLoading(true);

          saveSocials(guest?._id, poll?._id, values.socials)
            .then(() => modal.success({ title: 'Success', content: 'Socials saved successfully.' }))
            .catch((err) => modal.error({ title: 'Error', content: err?.message }))
            .finally(() => setLoading(false));
        }}
      >
        <SocialPostingItem />

        <Button loading={loading} type="primary" htmlType="submit" className="mt-2">
          SAVE
        </Button>
      </Form>
    </>
  );
}
