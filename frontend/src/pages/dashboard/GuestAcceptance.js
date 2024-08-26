import Logo from '../../components/Logo';
import AppTitle from '../../components/AppTitle';
import SocialMediaConnect from './SocialMediaConnect';
import LoadingScreen from '../../components/LoadingScreen';
import { useState, useEffect } from 'react';
import { getFullPath } from '../../routes/paths';
import { isMobile, isDesktop } from 'react-device-detect';
import { useParams, Navigate, Link } from 'react-router-dom';
import { getDateString, getSocialsItems } from '../../utils/common';
import { getSocials, saveSocials, updatePoll, pollActions } from '../../reducers/guestsSlice';
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
  message,
  Flex,
  Select,
  Collapse,
} from 'antd';

const { Text, Title, Paragraph } = Typography;
const { Panel } = Collapse;

export default function GuestAcceptance() {
  const { userName, pollUniqueId } = useParams();
  const [state, setState] = useState({
    poll: null,
    errorMsg: '',
    loading: true,
    validatedPolls: {},
    passwordValidated: false,
    stepOneCompleted: false,
    stepTwoCompleted: false,
  });

  const {
    poll,
    errorMsg,
    loading,
    validatedPolls,
    passwordValidated,
    stepOneCompleted,
    stepTwoCompleted,
  } = state;

  const guestId = poll?._id;
  const guest = poll?.guest || {};

  const updateState = (data) => setState((d) => ({ ...d, ...data }));

  useEffect(() => {
    if (pollUniqueId) {
      const validatedPolls = JSON.parse(window.localStorage.getItem('validatedPolls')) || {};
      const passwordValidated = validatedPolls[pollUniqueId] || false;

      // Fetch Poll  
      updateState({ loading: true, passwordValidated, validatedPolls });
      pollActions
        .getPollByUniqueId(userName, pollUniqueId)
        .then((poll) => updateState({ poll }))
        .catch(console.error)
        .finally(() => updateState({ loading: false }));
    }

    return () => {
      updateState({ poll: null, loading: false });
    };
  }, [userName, pollUniqueId]);

  if (loading) return <LoadingScreen />;
  if (!guestId) return <Navigate to="/404" />;

  return (
    <ConfigProvider theme={{ token: { fontSize: isMobile ? 14 : 16 } }}>
      <AppTitle title="Guest Acceptance" />
      <Row className="h-100vh guest-acceptance" style={{ flexFlow: 'row' }}>
        <Col span={isMobile ? 24 : 8} className="p-2 bg-white sidebar">
          <Logo rootClassName={isMobile ? 'mb-2' : 'sidebar-navlogo'} />

          <div className={`sidebar-content ${isDesktop && 'mt-2'}`}>
            <Title level={isMobile ? 4 : 3} className="text-center color-36c102">
              How does Upplaud grow our audience?
            </Title>

            <Title level={5} className={isMobile && 'mt-0'}>
              It's proven that when we ask others for input, we get to:
            </Title>
            <List
              size="small"
              className={isMobile ? 'mb-0' : 'mb-4'}
              dataSource={[
                'Make them feel part of us',
                'Give them what they want.',
                "They'll share us more:",
                'We grow our reach & impact',
                'We do business better!',
              ]}
              renderItem={(item) => (
                <List.Item className={`flex gap-2 m-1 p-1 border items-center rounded-sm border-solid list-item-${isMobile ? 'mobile' : 'desktop'}`}>
                  <Flex gap={'middle'} align='start'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.8966 6.63081C22.2168 7.52828 21.7678 8.14274 20.8986 8.748C20.1973 9.23636 19.3039 9.76542 18.3572 10.6699C17.4291 11.5566 16.5234 12.6246 15.7184 13.6758C14.743 14.9496 13.8206 16.2801 13.0087 17.6655C12.7026 18.1902 12.1521 18.5078 11.5619 18.4999C10.9716 18.4919 10.4293 18.1597 10.1364 17.6267C9.38765 16.264 8.80986 15.7259 8.5443 15.5326C7.8075 14.9963 7 14.9035 7 13.7335C7 12.7762 7.74623 12.0002 8.66675 12.0002C9.32548 12.0266 9.92854 12.3088 10.4559 12.6927C10.7981 12.9418 11.1605 13.2711 11.5375 13.7047C11.9799 13.051 12.5131 12.2968 13.1107 11.5163C13.9787 10.3829 15.0032 9.16689 16.1019 8.11719C17.1819 7.08531 18.4306 6.11941 19.7542 5.60872C20.6172 5.27573 21.5764 5.73333 21.8966 6.63081Z" stroke="#049CD2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4.43961 12.0755C4.28117 12.0236 4.13796 11.9909 4.01252 11.9713C3.94995 11.9615 3.89226 11.955 3.83976 11.951L3.69887 11.9454C2.76061 11.9454 2 12.728 2 13.6933C2 14.5669 2.62294 15.2908 3.43675 15.4205C3.4652 15.4355 3.51137 15.4624 3.57407 15.5076C3.84474 15.7025 4.43367 16.2452 5.19686 17.6193C5.49542 18.1569 6.04811 18.4918 6.64983 18.4999C7.06202 18.5054 7.45518 18.3567 7.76226 18.0924M15 5.5C13.6509 6.015 12.3781 6.98904 11.2773 8.02963C10.8929 8.39299 10.5174 8.77611 10.1542 9.16884" stroke="#049CD2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <label>{item}</label>
                  </Flex>
                </List.Item>
              )}
            />

            <Paragraph className={isMobile && 'm-0'}>
              Upplaud captures voter referrals, email addresses & offers rewards to voters; while pulling interest from multiple sources.
            </Paragraph>
          </div>
        </Col>

        <Col span={isMobile ? 24 : 16} className={isMobile ? 'p-2' : 'p-4'}>
          {poll && guest && (
            <ConnectSocialsInfo
              poll={poll}
              guest={guest}
              stepOneCompleted={stepOneCompleted}
              stepTwoCompleted={stepTwoCompleted}
              updateState={updateState}
            />
          )}
        </Col>
      </Row>

      <Modal
        footer={false}
        closable={false}
        maskClosable={false}
        open={!passwordValidated}
        styles={{ mask: { backgroundColor: '#fdeffff0' } }}
      >
        <div className={isDesktop && 'p-2'}>
          <Title level={3} className="mt-0">
            {poll?.password}Password Required!
          </Title>

          {errorMsg && <Paragraph type="danger">{errorMsg}</Paragraph>}

          <Form
            size="large"
            layout="vertical"
            initialValues={{ password: '' }}
            onFinish={({ password = '' }) => {
              if (password?.trim() === poll?.password) {
                const newValidatedPolls = { ...validatedPolls, [pollUniqueId]: true };
                window.localStorage.setItem('validatedPolls', JSON.stringify(newValidatedPolls));
                updateState({ passwordValidated: true, newValidatedPolls });
              } else updateState({ errorMsg: 'Invalid password!' });
            }}
          >
            <Form.Item name="password" label="Enter your password">
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Button block={isMobile} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
}

function ConnectSocialsInfo({ poll, guest, stepOneCompleted, stepTwoCompleted, updateState }) {
  const [form] = Form.useForm();
  const { modal } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [emailFrequency, setEmailFrequency] = useState(4);
  const [socialFrequency, setSocialFrequency] = useState(4);
  const defaultSocials = getSocialsItems(guest?.socialAccounts || []);

  const postingOptions = [4, 3, 2, 1].map((value) => ({
    value,
    label: `Post [${value}x] monthly`,
  }));

  useEffect(() => {
    setLoading(true);
    getSocials(guest?._id, poll?._id)
      .then((socials) => {
        form.setFieldsValue({ socials: socials?.length > 0 ? socials : defaultSocials });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [guest?._id, poll?._id]);

  const onGuestOfferSave = ({ guestOfferUrl, topic1, topic2 }) => {
    setLoading2(true);

    updatePoll(poll?._id, { guestOfferUrl, potentialTopics: [topic1, topic2] })
      .then(({ msg }) => {
        message.success({ content: msg });
        updateState({ stepOneCompleted: true });
      })
      .catch((err) => message.error({ content: err?.message }))
      .finally(() => setLoading2(false));
  };

  return (
    <Collapse defaultActiveKey={['1', '2', '3']} >
      <Panel header="Step 1: Confirm Our Details" key="1">
        <Card bordered={false} style={{ paddingRight: 0 }}>
          <div className={`flex-item gap-1 mb-4 ${isMobile && 'flex-column align-baseline'}`}>
            <Form
              layout="inline"
              onFinish={onGuestOfferSave}
              className={`d-flex flex-column gap-2 ${isMobile ? 'flex-column w-100' : ''}`}
              initialValues={{
                guestOfferUrl: poll?.guestOfferUrl ?? '',
                topic1: poll?.potentialTopics?.[0] ?? '',
                topic2: poll?.potentialTopics?.[1] ?? ''
              }}
            >
              <div className='d-flex gap-2 container'>
                <Text className="minw-fit-content">Possible topic or story #1</Text>
                <Form.Item
                  noStyle
                  name="topic1"
                  rules={[{ message: 'Possible topic or story #1' }]}
                >
                  <Input type="text" placeholder="Possible topic or story #1" />
                </Form.Item>
              </div>
              <div className='d-flex gap-2 container'>
                <Text className="minw-fit-content">Possible topic or story #2</Text>
                <Form.Item
                  noStyle
                  name="topic2"
                  rules={[{ message: 'Possible topic or story #2' }]}
                >
                  <Input type="text" placeholder="Possible topic or story #2" />
                </Form.Item>
              </div>
              <div className='d-flex gap-2 container'>
                <Text className="minw-fit-content">Web address of your reward for voting </Text>
                <Form.Item
                  noStyle
                  name="guestOfferUrl"
                  rules={[{ required: true, message: 'Please enter the offer url.' }]}
                >
                  <Input type="url" placeholder="Web address of your reward for voting " />
                </Form.Item>
              </div>
              <Form.Item noStyle>
                <Button block={isMobile} type="primary" htmlType="submit" loading={loading2}>
                  Save Details
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </Panel>
      <Panel header="Step 2: Connect your Email list & LinkedIn" key="2">
        <Card bordered={false} style={{ paddingRight: 0 }}>
          <SocialMediaConnect
            user={guest}
            isGuest={true}
            btnSize="default"
            showTitle={false}
            className="mb-4 mt-2"
          />
        </Card>
      </Panel>
      {/* <Panel header="Step 3: Confirm: Posting frequency..." key="3">
        <Card bordered={false} style={{ paddingRight: 0 }}>
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

              saveSocials(guest?._id, poll?._id, {
                socials: values.socials,
                emails: emailList,
                emailFrequency,
                socialFrequency,
              })
                .then(() => message.success({ content: 'Socials saved successfully.' }))
                .catch((err) => message.error({ content: err?.message }))
                .finally(() => setLoading(false));
            }}
          >
            <div>
              <Text>LinkedIn Posting Frequency: </Text>
              <Select
                size="small"
                defaultValue={4}
                placeholder="Select"
                options={postingOptions}
                style={{ minWidth: 200 }}
                className={isMobile && 'w-100'}
                onChange={setSocialFrequency}
              />
            </div>
            <div style={{ marginTop: '10px' }}>
              <Text>Email Posting Frequency: </Text>
              <Select
                size="small"
                defaultValue={4}
                placeholder="Select"
                options={postingOptions}
                style={{ minWidth: 200 }}
                className={isMobile && 'w-100'}
                onChange={setEmailFrequency}
              />
            </div>
            <Button
              block={isMobile}
              loading={loading}
              type="primary"
              htmlType="submit"
              className="mt-2"
            >
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
      </Panel> */}
    </Collapse>
  );
}

function TitleText({ title = '', index = 1, type = '', className = '', avatarStyles = {} }) {
  return (
    <Title type={type} level={isMobile ? 5 : 4} className={`flex-item gap-1 ${className}`}>
      <Avatar size="small" style={{ ...avatarStyles, minWidth: 27 }}>
        {index}
      </Avatar>

      {title}
    </Title>
  );
}