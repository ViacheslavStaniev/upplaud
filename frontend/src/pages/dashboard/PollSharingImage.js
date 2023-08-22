import Simplebar from 'simplebar-react';
import { useEffect, useState } from 'react';
import { getFullS3Url } from '../../config-global';
import { getImages, onFetchImages, uploadImage } from '../../reducers/imageSlice';
import {
  List,
  Form,
  Modal,
  Select,
  Button,
  Input,
  Avatar,
  Upload,
  Tooltip,
  Collapse,
  Typography,
  Popconfirm,
  ColorPicker,
} from 'antd';
import {
  InboxOutlined,
  MinusOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteImage } from '../../reducers/imageSlice';

const { Option } = Select;
const { Dragger } = Upload;
const { Text, Paragraph } = Typography;

export default function PollSharingImage() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAddManageImages, setShowAddManageImages] = useState(false);
  const { images } = useSelector((state) => state.images);

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  const TextColorFormItem = ({ label, title, formType }) => {
    return (
      <div className="flex-item gap-2 mb-2">
        <Form.Item label={label} name={[formType, 'text']} className="w-40 m-0">
          <Input
            placeholder="Enter the text here"
            suffix={
              <Tooltip title="Show Suggestions">
                <Button
                  type="text"
                  size="small"
                  icon={<QuestionCircleOutlined />}
                  onClick={() => setShowSuggestions(true)}
                />
              </Tooltip>
            }
          />
        </Form.Item>

        <Form.Item className="flex-1 m-0" label={`${title} BG COLOR`} name={[formType, 'bgColor']}>
          <ColorPicker showText />
        </Form.Item>

        <Form.Item
          className="flex-1 m-0"
          label={`${title} TEXT COLOR`}
          name={[formType, 'textColor']}
        >
          <ColorPicker showText />
        </Form.Item>
      </div>
    );
  };

  const items = [
    {
      key: 'social',
      label: 'Customize poll sharing image',
      children: (
        <>
          <Form
            form={form}
            size="medium"
            labelWrap={true}
            labelAlign="left"
            layout="horizontal"
            labelCol={{ span: 11 }}
            wrapperCol={{ span: 13 }}
          >
            <div className="flex-item gap-2 mb-2">
              <Form.Item label="LOGO IMAGE FROM" name="logo" className="w-40 m-0">
                <Select className="minw-200px" placeholder="Select an Image">
                  {images.map(({ _id, name, s3Path }) => (
                    <Option key={_id} value={_id} className="flex-item gap-1">
                      <Avatar src={getFullS3Url(s3Path)} />
                      <Text>{name}</Text>
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Button
                type="link"
                icon={<PlusOutlined />}
                onClick={() => setShowAddManageImages(true)}
              >
                ADD/MANAGE IMAGES
              </Button>
              <Button type="link" disabled>
                PREVIEW SELECTION
              </Button>
            </div>

            <TextColorFormItem label="HEADLINE HOOK" title="HEADLINE" formType="header" />
            <TextColorFormItem label="FOOTER BENEFIT" title="FOOTER" formType="footer" />
          </Form>

          <div className="flex-item gap-2 mt-4">
            <Button type="primary" danger>
              GENERATE POLL SHARING IMAGE
            </Button>
            <Button type="primary">UPLOAD YOUR OWN</Button>
          </div>
        </>
      ),
    },
  ];

  const suggestions = [
    'BENEFIT TO VOTER:',
    'Learn 3 mistakes to avoid...',
    'Hear the juicy details',
    'Ask Anything & Hear The Answer',
    'Make our podcast perfect for you...',
    'Have us discuss what you want to know',
    'Hear some step by step instructions',
    'Get free help from our guest speaker',
  ];

  const uploadProps = {
    name: 'file',
    multiple: true,
    showUploadList: false,
    accept: '.png, .gif, .jpeg, .jpg',
    customRequest: async ({ file }) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        const imageData = reader.result.split(',')[1];
        const requestBody = {
          images: [
            {
              name: file.name,
              imageData: `data:${file.type};base64,${imageData}`,
            },
          ],
        };
        dispatch(uploadImage(requestBody));
      };
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const deleteSingleImage = (id) => {
    if (id) {
      const newImages = images.filter((image) => image._id !== id);
      dispatch(onFetchImages(newImages));
      dispatch(deleteImage(id));
    }
  };

  return (
    <>
      <Collapse
        items={items}
        bordered={false}
        className="mb-2 bg-F7F3F9"
        expandIcon={({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}
      />

      <Modal
        centered
        footer={false}
        title="Suggestions"
        open={showSuggestions}
        onCancel={() => setShowSuggestions(false)}
      >
        <List
          header={false}
          footer={false}
          bordered={false}
          dataSource={suggestions}
          renderItem={(item) => (
            <List.Item>
              <Text copyable>{item}</Text>
            </List.Item>
          )}
        />
      </Modal>

      <Modal
        centered
        footer={false}
        title="Add/Manage Images"
        open={showAddManageImages}
        onCancel={() => setShowAddManageImages(false)}
      >
        <Paragraph>Add New Image</Paragraph>
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Supported file types: PNG/JPG/JPEG</p>
        </Dragger>

        <Simplebar style={{ maxHeight: 420, paddingRight: 10 }}>
          <List
            footer={false}
            bordered={false}
            dataSource={images}
            header="Available Images"
            renderItem={({ _id, name, s3Path }) => (
              <List.Item
                actions={[
                  <Popconfirm
                    key="delete"
                    okText="Yes"
                    cancelText="No"
                    title="Delete Image"
                    description="Are you sure to delete this image?"
                    onConfirm={() => deleteSingleImage(_id)}
                  >
                    <Button danger size="small">
                      Delete
                    </Button>
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  title={name}
                  style={{ alignItems: 'center' }}
                  avatar={<Avatar src={getFullS3Url(s3Path)} />}
                />
              </List.Item>
            )}
          />
        </Simplebar>
      </Modal>
    </>
  );
}
