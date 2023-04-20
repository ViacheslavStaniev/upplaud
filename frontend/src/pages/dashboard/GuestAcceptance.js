import dayjs from "dayjs";
import AddGuest from "./AddGuest";
import Simplebar from "simplebar-react";
import Logo from "../../components/Logo";
import AppTitle from "../../components/AppTitle";
import CustomIcon from "../../components/CustomIcon";
import SocialMediaConnect from "./SocialMediaConnect";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { CalendarOutlined, MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Card, Form, Button, Row, Col, Divider, Typography, Steps, Modal, DatePicker, Input, Collapse, Calendar } from "antd";

const { Panel } = Collapse;
const { Link, Title, Paragraph } = Typography;

export default function GuestAcceptance() {
  const params = useParams();
  console.log(params);

  const [currentStep, setCurrentStep] = useState(1);

  return (
    <>
      <AppTitle title='Guest Acceptance' />

      <Row className='h-100vh guest-acceptance'>
        <Col span={6} className='p-4 leftbg'>
          <Logo />

          <Title className='fw-300' style={{ marginTop: 50, fontSize: 54 }}>
            Build interest in your episode...
          </Title>
          <Title level={4} className='color-6b0d88'>
            Even before it's recorded!
          </Title>

          <Paragraph style={{ marginTop: 60, marginBottom: 25 }}>Automate your episode promotion in just 2 quick steps</Paragraph>

          <Steps
            direction='vertical'
            current={currentStep}
            items={[{ title: "Click" }, { title: "Connect Socials" }, { title: "Confirm Schedule" }]}
          />
        </Col>

        <Col span={18} className='p-50px'>
          {currentStep === 1 && <ConnectSocialsInfo onClickNext={() => setCurrentStep(2)} />}

          {currentStep === 2 && <ConfirmScheduleInfo onClickPrev={() => setCurrentStep(1)} />}
        </Col>
      </Row>
    </>
  );
}

function ConnectSocialsInfo({ onClickNext }) {
  return (
    <>
      <Title className='color-6b0d88 fw-400' style={{ marginBottom: 35 }}>
        First, confirm your info. Then connect your social media.
      </Title>

      <AddGuest isGuestAcceptance />

      <Title level={3} className='fw-400' style={{ marginTop: 25, marginBottom: 35 }}>
        We'll gather questions from your connections that you and the host can answer during your recording. You can connect any or all
        of your social media:
      </Title>

      <SocialMediaConnect showTitle={false} />

      <Divider style={{ marginTop: 40, marginBottom: 40 }} />

      <Button type='info' shape='round' size='large' onClick={onClickNext}>
        NEXT: CONFIRM POSTING SCHEDULE
      </Button>
    </>
  );
}

function ConfirmScheduleInfo({ onClickPrev }) {
  const [form] = Form.useForm();

  const [openModal, setOpenModal] = useState(false);

  const initialValues = { showName: "", showLogo: "", hostName: "", hostEmail: "", recordingDate: "" };

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDateString = (timestamp) => new Date(timestamp).toDateString();
  const randomDate = () => new Date(new Date() - Math.random() * 1e12).getTime();
  const postings = Array(5)
    .fill(0)
    .map((_, i) => ({ key: i, date: randomDate() }));

  return (
    <>
      <Title className='color-6b0d88 fw-400' style={{ marginBottom: 35 }}>
        Confirm automatic posting schedule
      </Title>

      <Button type='info' shape='round' size='large' className='uppercase' onClick={() => setOpenModal(true)}>
        Click to Start Your Pre Episode Promotion
      </Button>

      <Title level={4} className='fw-400' style={{ marginTop: 25, marginBottom: 35 }}>
        Click <CalendarOutlined /> to edit dates.{" "}
        <Link onClick={onClickPrev} className='font-inherit'>
          Click here
        </Link>{" "}
        to go back and edit your job title and business.
      </Title>

      <Simplebar style={{ maxHeight: "calc(100vh - 370px)", paddingRight: 10 }}>
        <Collapse
          bordered={false}
          className='mb-2'
          defaultActiveKey={[0]}
          expandIconPosition='end'
          expandIcon={({ isActive }) =>
            isActive ? (
              <MinusCircleOutlined className='font-20px color-5D0578' />
            ) : (
              <PlusCircleOutlined className='font-20px color-5D0578' />
            )
          }
        >
          {postings.map(({ key, date }) => (
            <Panel
              header={
                <Title level={3}>
                  Posting {key + 1}: {getDateString(date)}
                </Title>
              }
              key={key}
            >
              <div className='flex-item gap-2'>
                <Card style={{ height: 322 }} className='flex-1'>
                  Hello World
                </Card>

                <Calendar value={dayjs(date)} className='flex-1' fullscreen={false} onPanelChange={console.log} />
              </div>
            </Panel>
          ))}
        </Collapse>
      </Simplebar>

      <Button type='info' shape='round' size='large' className='uppercase' onClick={() => setOpenModal(true)}>
        Click to Start Your Pre Episode Promotion
      </Button>

      <Modal
        centered
        footer={false}
        closable={false}
        open={openModal}
        width={`min(700px, 100%)`}
        bodyStyle={{ padding: "0px 50px 20px" }}
      >
        <CustomIcon name='star_flower' className='position-absolute top--60px left--60px' />
        <CustomIcon name='success_cup' className='position-absolute top--60px right-0' />

        <Title className='color-6b0d88 fw-400 m-0'>Congratulations</Title>
        <Paragraph className='font-20px'>Your pre episode promotion has started!</Paragraph>
        <Divider />

        <Title level={2}>Going to be a guest on other shows?</Title>
        <Paragraph className='font-16px'>Invite those hosts to use Podasq to automate your episode promotion:</Paragraph>

        <Form form={form} size='large' layout='vertical' onFinish={onSubmit} initialValues={initialValues}>
          <Form.Item name='showName' label='Show Name (Optional)'>
            <Input placeholder='Show Name (Optional)' />
          </Form.Item>
          <Form.Item name='hostName' label='Host name'>
            <Input placeholder='Host name' />
          </Form.Item>
          <Form.Item name='hostEmail' label='Host Email'>
            <Input placeholder='Host Email' />
          </Form.Item>
          <Form.Item name='recordingDate' label='Recording Date'>
            <DatePicker className='w-100' />
          </Form.Item>
          <Form.Item name='showLogo' label="Upload the show's logo (optional)">
            <Input
              readOnly
              placeholder='Select file to attach'
              suffix={
                <Button type='info' size='small'>
                  Attach file
                </Button>
              }
            />
          </Form.Item>

          <Button block type='info' shape='round' className='uppercase mb-1' htmlType='submit'>
            Invite HOST & Add More Shows
          </Button>

          <Button block type='text' shape='round' onClick={() => setOpenModal(false)}>
            I’m done automating my social media, thanks!
          </Button>
        </Form>
      </Modal>
    </>
  );
}
