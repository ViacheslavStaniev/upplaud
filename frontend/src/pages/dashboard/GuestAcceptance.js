import Logo from '../../components/Logo';
import AppTitle from '../../components/AppTitle';
import CustomIcon from '../../components/CustomIcon';
import SocialMediaConnect from './SocialMediaConnect';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  List,
  Form,
  Input,
  Button,
  Row,
  Col,
  Divider,
  Checkbox,
  Typography,
  Modal,
  DatePicker,
  Space,
  ConfigProvider,
  Switch,
  Select,
} from 'antd';

const { Text, Link, Title, Paragraph } = Typography;

export default function GuestAcceptance() {
  const params = useParams();
  console.log(params);

  const [currentStep, setCurrentStep] = useState(1);

  const listItems = [
    '- Make them feel part of us',
    '- Give them what they want.',
    '- They’ll share us more:',
    '- We grow our reach & impact',
    '- We do business better!',
  ];

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
              dataSource={listItems}
              renderItem={(item) => <List.Item className="border-0">{item}</List.Item>}
            />

            <Paragraph>
              Mic.vote makes polling & voting fast and easy, pulling together votes from multiple
              sources. We’re also able to capture referrals, email addresses, and offer gifts &
              rewards to voters.
            </Paragraph>
          </div>
        </Col>

        <Col span={18} className="p-50px">
          {currentStep === 1 && <ConnectSocialsInfo onClickNext={() => setCurrentStep(2)} />}

          {currentStep === 2 && <ConfirmScheduleInfo onClickPrev={() => setCurrentStep(1)} />}
        </Col>
      </Row>
    </ConfigProvider>
  );
}

function ConnectSocialsInfo({ onClickNext }) {
  return (
    <>
      <Title className="color-6b0d88 fw-600 m-0 mb-2">
        Hi Mark, <strong>thank you</strong> for being our guest!
      </Title>

      <Title className="m-0 mb-2">Let’s grow the biggest audience for you...</Title>

      <Title level={2} className="m-0 mb-3">
        by asking our connections to vote on our topics.
      </Title>

      <Paragraph italic>
        Optional: Watch our mic.vote <Link href="#">tutorial video</Link>
      </Paragraph>

      {/* <NewAutomation isGuestAcceptance /> */}

      <Title level={3} className="fw-400">
        Start polling each other’s social media:
      </Title>

      <SocialMediaConnect showTitle={false} className="mb-2 mt-2" />

      <Space className="d-flex mb-4">
        <Text>Offer a free gift to voters</Text>
        <Divider type="vertical" className="border-000000" />
        <Text>See our poll page & add topics</Text>
        <Divider type="vertical" className="border-000000" />
        <Text>Preview posts</Text>
      </Space>

      <Paragraph className="m-0">
        To reach the most people, we'll repeat our mic.vote until June 15, 2023:
      </Paragraph>
      <Paragraph strong>
        Re-post the poll <RepostSchedule />.{' '}
        <Button className="primary-outlined" onClick={onClickNext}>
          SAVE
        </Button>
      </Paragraph>
    </>
  );
}

function ConfirmScheduleInfo({ onClickPrev }) {
  const [form] = Form.useForm();

  const [openModal, setOpenModal] = useState(false);

  const initialValues = {
    showName: '',
    showLogo: '',
    hostName: '',
    hostEmail: '',
    recordingDate: '',
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Title className="color-6b0d88 fw-600 m-0 mb-4">Thank you for voting & sharing!</Title>
      <Paragraph italic>
        Optional: Watch our mic.vote <Link href="#">welcome video</Link>
      </Paragraph>

      <Title level={2} className="mt-2">
        To access gifts & goodies from us, please sign your vote:
      </Title>

      <Form size="large" layout="vertical" onFinish={console.log}>
        <Form.Item name="name" label="First Name" className="mb-1">
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item name="email" label="Email" className="mb-1">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="zipCode" label="Zip Code" className="mb-1">
          <Input placeholder="Zip Code" />
        </Form.Item>

        <Form.Item name="knowHost" className="m-0">
          <Checkbox>I know Mark Bullock, the host</Checkbox>
        </Form.Item>
        <Form.Item name="knowGuest">
          <Checkbox>I know Ada Hasloecher, the guest</Checkbox>
        </Form.Item>
      </Form>

      <Paragraph strong>Yes, I'm happy to share this poll on my social media:</Paragraph>
      <SocialMediaConnect showTitle={false} className="mb-4" />

      <Paragraph>
        <Switch /> To reach more of my connections, re-post until June 15, 2023: _3_ times every 30
        days.
      </Paragraph>

      <Button
        type="info"
        shape="round"
        size="large"
        className="uppercase"
        onClick={() => setOpenModal(true)}
      >
        SAVE VOTE
      </Button>

      <Modal
        centered
        footer={false}
        closable={false}
        open={openModal}
        width={`min(700px, 100%)`}
        bodyStyle={{ padding: '0px 50px 20px' }}
      >
        <CustomIcon name="star_flower" className="position-absolute top--60px left--60px" />
        <CustomIcon name="success_cup" className="position-absolute top--60px right-0" />

        <Title className="color-6b0d88 fw-400 m-0">Congratulations</Title>
        <Paragraph className="font-20px">Your pre episode promotion has started!</Paragraph>
        <Divider />

        <Title level={2}>Going to be a guest on other shows?</Title>
        <Paragraph>Invite those hosts to use Podasq to automate your episode promotion:</Paragraph>

        <Form
          form={form}
          size="large"
          layout="vertical"
          onFinish={onSubmit}
          initialValues={initialValues}
        >
          <Form.Item name="showName" label="Show Name (Optional)">
            <Input placeholder="Show Name (Optional)" />
          </Form.Item>
          <Form.Item name="hostName" label="Host name">
            <Input placeholder="Host name" />
          </Form.Item>
          <Form.Item name="hostEmail" label="Host Email">
            <Input placeholder="Host Email" />
          </Form.Item>
          <Form.Item name="recordingDate" label="Recording Date">
            <DatePicker className="w-100" />
          </Form.Item>
          <Form.Item name="showLogo" label="Upload the show's logo (optional)">
            <Input
              readOnly
              placeholder="Select file to attach"
              suffix={
                <Button type="info" size="small">
                  Attach file
                </Button>
              }
            />
          </Form.Item>

          <Button block type="info" shape="round" className="uppercase mb-1" htmlType="submit">
            Invite HOST & Add More Shows
          </Button>

          <Button block type="text" shape="round" onClick={() => setOpenModal(false)}>
            I’m done automating my social media, thanks!
          </Button>
        </Form>
      </Modal>
    </>
  );
}

function RepostSchedule() {
  const getOptions = (size) =>
    Array(size)
      .fill(0)
      .map((_, i) => ({ label: i + 1, value: i + 1 }));

  return (
    <Text style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
      <Select defaultValue={3} options={getOptions(4)} style={{ minWidth: 30 }} />
      times every
      <Select showSearch defaultValue={30} options={getOptions(31)} style={{ minWidth: 30 }} />
      days
    </Text>
  );
}
