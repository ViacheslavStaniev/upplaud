import { CLOUDFRONT_URL } from '../../config-global';
import { useAuthContext } from '../../auth/AuthProvider';
import { Form, Image, Input, Upload, Button, Typography } from 'antd';

const { Dragger } = Upload;
const { Text, Title, Paragraph } = Typography;

export default function ShowInfo() {
  const [form] = Form.useForm();
  const {
    isLoading,
    addUpdateShow,
    user: { show },
  } = useAuthContext();

  const props = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    accept: '.png, .gif, .jpeg, .jpg',
    customRequest: ({ file }) => {
      const reader = new FileReader();
      reader.onloadend = () => form.setFieldValue('logo', reader.result);
      reader.readAsDataURL(file);
    },
  };

  const logo = Form.useWatch('logo', form);

  return (
    <>
      <Title level={3} className="m-0 mb-2">
        Show Info
      </Title>

      <Form
        form={form}
        size="large"
        className="w-80"
        layout="vertical"
        onFinish={(data) => addUpdateShow(data, show?._id)}
        initialValues={{
          name: show?.name,
          website: show?.website,
          logo: show && show.logo ? CLOUDFRONT_URL + show.logo : '',
        }}
      >
        <div className="flex-item gap-2">
          <Form.Item
            name="name"
            className="flex-1"
            label="YOUR SHOW'S NAME"
            rules={[{ required: true, message: 'Show Name is required.' }]}
          >
            <Input placeholder="YOUR SHOW'S NAME" />
          </Form.Item>
          <Form.Item name="website" label="YOUR SHOW'S WEBPAGE" className="flex-1">
            <Input type="url" placeholder="Blog, landing pages, etc" />
          </Form.Item>
        </div>

        <div className="flex-item gap-2 align-baseline">
          <Form.Item name="logo" hidden>
            <Input />
          </Form.Item>

          <Form.Item label="Upload the show's logo" className="flex-auto">
            <Dragger
              style={{
                padding: 20,
                width: '100%',
                background: 'rgb(252, 251, 252)',
                border: '2px dashed rgb(179, 179, 179)',
              }}
              {...props}
            >
              <Paragraph>Click to upload photo or drag and drop</Paragraph>
              <Text>Any file up to 10MB</Text>
            </Dragger>
          </Form.Item>

          <div className={logo ? '' : 'visibility-hidden'}>
            <Paragraph className="form-label mb-8px">Uploaded logo</Paragraph>
            <Image
              src={logo}
              alt="uploaded logo"
              className="bg-1B1E22 border-E0E0E0 br-5px maxw-125px maxh-125px"
            />
          </div>
        </div>

        <Button
          shape="round"
          htmlType="submit"
          loading={isLoading}
          className="minw-110px primary-outlined"
        >
          SAVE
        </Button>
      </Form>
    </>
  );
}
