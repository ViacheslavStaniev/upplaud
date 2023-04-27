import AppTitle from '../../components/AppTitle';
import CustomIcon from '../../components/CustomIcon';
import { SketchPicker } from 'react-color';
import { BgColorsOutlined, PictureOutlined } from '@ant-design/icons';
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Popover,
  Typography,
  Space,
  Input,
  // Select,
  Divider,
  Tooltip,
} from 'antd';
import { useCallback } from 'react';

export default function PostingTemplate() {
  const [form] = Form.useForm();

  const { Title, Paragraph } = Typography;

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // const options = Array(5)
  //   .fill(0)
  //   .map((_, i) => ({ value: i, label: `Postcard ${i + 1}` }));

  const bgColor = Form.useWatch('bgColor', form);
  const textColor = Form.useWatch('textColor', form);

  const ColorPicker = useCallback(
    ({ name, value }) => {
      return (
        <Popover
          trigger="click"
          title="Pick a Color"
          content={
            <SketchPicker
              color={value}
              onChangeComplete={(color) => form.setFieldValue(name, color.hex)}
            />
          }
        >
          <Tooltip title="Pick a Color">
            <Button size="small" type="text" icon={<BgColorsOutlined />} />
          </Tooltip>
        </Popover>
      );
    },
    [form]
  );

  return (
    <>
      <AppTitle title="Posting Template" />

      <div className="posting-template">
        <Title className="m-0 mb-1">Posting Template</Title>

        <div className="bg-F7F3F9 br-8px p-2 mb-4">
          <Paragraph>
            Customize the default color & headline text for your Poll’s Postcard.
          </Paragraph>
          <Paragraph>
            Plus, you’ll be able to customize the posting schedule for your social media. Guests can
            tailor their own schedule.
          </Paragraph>
          <Paragraph className="m-0">
            What you see below is a template. Each postcard will be updated with your Guest’s info.
          </Paragraph>
        </div>

        <Row>
          <Col span={10}>
            <Title level={3} className="m-0 mb-2">
              Select Postcard to Edit
            </Title>

            <Form
              form={form}
              size="large"
              layout="vertical"
              onFinish={onSubmit}
              initialValues={{
                // postcard: 0,
                headline: '',
                textColor: '#000000',
                bgColor: '#000000',
              }}
            >
              {/* <Form.Item name="postcard" label="SELECT POSTCARD">
                <Select options={options} placeholder="Select a postcard" onChange={console.log} />
              </Form.Item> */}

              <Form.Item name="headline" label="HEADLINE TEXT">
                <Input placeholder="Enter your headline text here..." />
              </Form.Item>

              <Form.Item name="textColor" label="TEXT COLOR">
                <Input
                  readOnly
                  placeholder="e.g #000000"
                  suffix={<ColorPicker name="textColor" value={textColor} />}
                  prefix={<CustomIcon name="square_fill" style={{ color: textColor }} />}
                />
              </Form.Item>

              <Form.Item name="bgColor" label="BACKGROUND COLOR">
                <Input
                  placeholder="e.g #000000"
                  suffix={<ColorPicker name="bgColor" value={bgColor} />}
                  prefix={<CustomIcon name="square_fill" style={{ color: bgColor }} />}
                />
              </Form.Item>

              <Space direction="vertical" size={16}>
                <Button
                  shape="round"
                  htmlType="submit"
                  className="primary-outlined"
                  loading={false}
                >
                  SAVE CUSTOMIZATION
                </Button>

                <Button type="info" shape="round">
                  CUSTOMIZE YOUR POSTING SCHEDULE
                </Button>
              </Space>
            </Form>
          </Col>

          <Col span={2} className="text-center">
            <Divider type="vertical" className="h-100" />
          </Col>

          <Col span={10}>
            <Title level={3} className="m-0 mb-2">
              Postcard Preview
            </Title>

            <Card
              bodyStyle={{ textAlign: 'center' }}
              className="flex-item flex-center br-12px"
              style={{
                width: 'min(100%, 560px)',
                background: 'rgba(0, 204, 204, 0.02)',
                height: 'min(calc(100% - 2rem), 315px)',
                border: '1px solid rgba(0, 204, 204, 0.5)',
              }}
            >
              <PictureOutlined className="color-0AB6B6 font-80px" />
              <Title level={4} className="color-6b0d88 mt-2">
                No preview available yet
              </Title>
              <Paragraph className="font-16px">
                Please select the postcard first to get a preview
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
