import AppTitle from "../../components/AppTitle";
import CustomIcon from "../../components/CustomIcon";
import { SketchPicker } from "react-color";
import { BgColorsOutlined, PictureOutlined } from "@ant-design/icons";
import { Row, Col, Card, Form, Button, Popover, Typography, Space, Input, Select, Divider, Tooltip } from "antd";
import { useCallback } from "react";

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

  const options = Array(5)
    .fill(0)
    .map((_, i) => ({ value: i, label: `Postcard ${i + 1}` }));

  const bgColor = Form.useWatch("bgColor", form);
  const textColor = Form.useWatch("textColor", form);

  const ColorPicker = useCallback(
    ({ name, value }) => {
      return (
        <Popover
          trigger='click'
          title='Pick a Color'
          content={<SketchPicker color={value} onChangeComplete={(color) => form.setFieldValue(name, color.hex)} />}
        >
          <Tooltip title='Pick a Color'>
            <Button size='small' type='text' icon={<BgColorsOutlined />} />
          </Tooltip>
        </Popover>
      );
    },
    [form]
  );

  return (
    <>
      <AppTitle title='Posting Template' />

      <div className='posting-template'>
        <Title className='m-0 mb-1'>Posting Template</Title>

        <div className='bg-F7F3F9 br-8px p-2 mb-4'>
          <Paragraph>
            You can have up to 5 postcards posted per episode, promoting it on your social media & on your guests. In this screen, you
            can edit the color & text of each postcard's Headline.
          </Paragraph>
          <Paragraph>
            Plus you can customize the Postcard posting schedule for your social media. This will be the default for your Guest. But
            they can tailor their posting schedule for themselves.
          </Paragraph>
          <Paragraph className='m-0'>
            Each postcard will automatically be updated with your Guest's name, topic title, recording date & the Ask Page URL. What
            you'll see below is simply a template for your headline customization.
          </Paragraph>
        </div>

        <Row>
          <Col span={10}>
            <Title level={3} className='m-0 mb-2'>
              Select Postcard to Edit
            </Title>

            <Form
              form={form}
              size='large'
              layout='vertical'
              onFinish={onSubmit}
              initialValues={{ postcard: 0, headline: "", textColor: "#000000", bgColor: "#000000" }}
            >
              <Form.Item name='postcard' label='SELECT POSTCARD'>
                <Select options={options} placeholder='Select a postcard' onChange={console.log} />
              </Form.Item>

              <Form.Item name='headline' label='HEADLINE TEXT'>
                <Input placeholder='Enter your headline text here...' />
              </Form.Item>

              <Form.Item name='textColor' label='TEXT COLOR'>
                <Input
                  readOnly
                  placeholder='e.g #000000'
                  suffix={<ColorPicker name='textColor' value={textColor} />}
                  prefix={<CustomIcon name='square_fill' style={{ color: textColor }} />}
                />
              </Form.Item>

              <Form.Item name='bgColor' label='BACKGROUND COLOR'>
                <Input
                  placeholder='e.g #000000'
                  suffix={<ColorPicker name='bgColor' value={bgColor} />}
                  prefix={<CustomIcon name='square_fill' style={{ color: bgColor }} />}
                />
              </Form.Item>

              <Space direction='vertical' size={16}>
                <Button shape='round' htmlType='submit' className='primary-outlined' loading={false}>
                  SAVE CUSTOMIZATION
                </Button>

                <Button type='info' shape='round'>
                  CUSTOMIZE YOUR POSTING SCHEDULE
                </Button>
              </Space>
            </Form>
          </Col>

          <Col span={2} className='text-center'>
            <Divider type='vertical' className='h-100' />
          </Col>

          <Col span={10}>
            <Title level={3} className='m-0 mb-2'>
              Postcard Preview
            </Title>

            <Card
              bodyStyle={{ textAlign: "center" }}
              className='flex-item flex-center br-12px'
              style={{
                width: "min(100%, 560px)",
                background: "rgba(0, 204, 204, 0.02)",
                height: "min(calc(100% - 2rem), 500px)",
                border: "1px solid rgba(0, 204, 204, 0.5)",
              }}
            >
              <PictureOutlined className='color-0AB6B6 font-80px' />
              <Title level={3} className='color-6b0d88 mt-2'>
                No preview available yet
              </Title>
              <Paragraph className='font-16px'>Please select the postcard first to get a preview</Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
