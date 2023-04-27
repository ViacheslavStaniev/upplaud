import AppTitle from '../../components/AppTitle';
import TextEditor from '../../components/TextEditor';
import { Card, Form, Button, Input, Space, Collapse, Typography } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

export default function EmailTemplates() {
  const { Panel } = Collapse;
  const { Text, Title, Paragraph } = Typography;

  // const [form] = Form.useForm();

  const invitations = Array(5)
    .fill(0)
    .map((_, i) => ({
      key: i,
      header: `Invitation ${i + 1}`,
      initialValues: { subject: '', body: `This is dummy text ${i + 1}` },
    }));

  return (
    <>
      <AppTitle title="Invitation Template" />

      <div className="email-template">
        <Title className="m-0 mb-1">Invitation Template</Title>

        <Paragraph className="mb-4">
          Our system invites your guests to connect their social media to automatically pull
          interest in their upcoming episode. While you can manually remind your guests via the
          Automations Dashboard, below are 3 successive emails & text messages that will remind your
          guests for you.
        </Paragraph>

        <Form.Provider>
          <Collapse
            accordion
            bordered={false}
            defaultActiveKey={[0]}
            expandIconPosition="end"
            expandIcon={({ isActive }) =>
              isActive ? (
                <MinusCircleOutlined className="font-20px color-5D0578" />
              ) : (
                <PlusCircleOutlined className="font-20px color-5D0578" />
              )
            }
          >
            {invitations.map(({ key, header, initialValues }) => (
              <Panel header={header} key={key}>
                <Form
                  name={`form_${key}`}
                  size="large"
                  layout="vertical"
                  onFinish={console.log}
                  initialValues={initialValues}
                >
                  <Form.Item name="subject" label="SUBJECT">
                    <Input placeholder="Enter your subject here" />
                  </Form.Item>

                  <TextEditor name="body" placeholder="Enter your text here..." />

                  <Paragraph className="form-label mb-8px">
                    MANDATORY UNEDITABLE END OF EMAIL:
                  </Paragraph>
                  <Card className="mb-3 bg-F4F6F8">
                    <Text className="font-20px">
                      Please click this button to connect your social media & automate your episode
                      promotion:
                    </Text>
                  </Card>

                  <Space>
                    <Button type="info" htmlType="submit" shape="round">
                      SAVE EDITS
                    </Button>
                    <Button shape="round" className="primary-outlined" loading={false}>
                      REVERT TO ORIGINAL
                    </Button>
                  </Space>
                </Form>
              </Panel>
            ))}
          </Collapse>
        </Form.Provider>
      </div>
    </>
  );
}
