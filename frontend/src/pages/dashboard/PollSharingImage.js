import Simplebar from 'simplebar-react';
import { useEffect, useState } from 'react';
import { getFullS3Url } from '../../config-global';
import { useDispatch, useSelector } from 'react-redux';
import { getImages, uploadImage, deleteImage, generatePollImage } from '../../reducers/imageSlice';
import {
  List,
  Form,
  Spin,
  Modal,
  Image,
  Select,
  Button,
  Input,
  Avatar,
  Upload,
  Tooltip,
  Typography,
  Popconfirm,
  ColorPicker,
} from 'antd';
import { PlusOutlined, InboxOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import Accordian from '../../components/Accordian';
import CustomUpload from '../layouts/CustomUpload';
import SuggestionModal from '../layouts/SuggestionModal';

const { Option } = Select;
const { Dragger } = Upload;
const { Text, Paragraph } = Typography;

export default function PollSharingImage() {
  const form = Form.useFormInstance();
  const pollImageSrc = Form.useWatch('pollImageSrc', form);

  // Local States
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAddManageImages, setShowAddManageImages] = useState(false);
  const [showPollImagePreview, setShowPollImagePreview] = useState(false);

  // Redux States
  const dispatch = useDispatch();
  const { images, isLoading, isUploading } = useSelector((state) => state.images);

  // Get Images
  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  const getFormName = (name) => ['pollSharingImage', name];

  const TextColorFormItem = ({ label, title, formType }) => {
    return (
      <div className="flex-item gap-2 mb-2">
        <Form.Item label={label} name={getFormName(`${formType}Text`)} className="w-40 m-0">
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

        <Form.Item
          className="flex-1 m-0"
          label={`${title} BG COLOR`}
          name={getFormName(`${formType}BgColor`)}
        >
          <ColorPicker
            showText
            onChangeComplete={(metaColor) =>
              form.setFieldValue(getFormName(`${formType}BgColor`), metaColor.toHexString())
            }
          />
        </Form.Item>

        <Form.Item
          className="flex-1 m-0"
          label={`${title} TEXT COLOR`}
          name={getFormName(`${formType}TextColor`)}
        >
          <ColorPicker
            showText
            onChangeComplete={(metaColor) =>
              form.setFieldValue(getFormName(`${formType}TextColor`), metaColor.toHexString())
            }
          />
        </Form.Item>
      </div>
    );
  };

  const onPollImageGenerateClick = async () => {
    setIsGenerating(true);
    const { pollSharingImage } = form.getFieldsValue();

    try {
      const res = await generatePollImage(pollSharingImage);

      form.setFieldValue('pollImageSrc', res.s3Path);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const items = [
    {
      key: 'pollSharingImage',
      label: 'Customize Poll Sharing Image',
      children: (
        <>
          <div className="flex-item gap-2 mb-2">
            <Form.Item label="LOGO IMAGE FROM" name={getFormName('logo')} className="w-40 m-0">
              <Select
                loading={isLoading}
                disabled={isLoading}
                className="minw-200px"
                placeholder="Select an Image"
              >
                {images.map(({ _id, name, s3Path }) => (
                  <Option key={_id} value={_id}>
                    <Avatar src={getFullS3Url(s3Path)} size={32} />
                    <Text style={{ marginLeft: 5 }}>{name}</Text>
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
          </div>

          <TextColorFormItem label="HEADLINE HOOK" title="HEADLINE" formType="header" />
          <TextColorFormItem label="FOOTER BENEFIT" title="FOOTER" formType="footer" />

          <div className="flex-item gap-2 mt-4">
            <Button danger type="primary" loading={isGenerating} onClick={onPollImageGenerateClick}>
              GENERATE POLL SHARING IMAGE
            </Button>
            <CustomUpload
              cropShape="rect"
              aspect={1.9 / 1}
              onComplete={(value) => form.setFieldValue('pollImageSrc', value)}
            >
              <Button type="primary">UPLOAD YOUR OWN</Button>
            </CustomUpload>

            <Button
              type="default"
              disabled={!pollImageSrc}
              onClick={() => setShowPollImagePreview(true)}
            >
              Preview Image
            </Button>

            <Image
              style={{ display: 'none' }}
              src={getFullS3Url(pollImageSrc)}
              preview={{
                visible: showPollImagePreview,
                onVisibleChange: (value) => setShowPollImagePreview(value),
              }}
            />
          </div>
        </>
      ),
    },
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

  return (
    <>
      <Accordian items={items} defaultActive="pollSharingImage" />

      <SuggestionModal open={showSuggestions} onCancel={() => setShowSuggestions(false)} />

      <Modal
        centered
        footer={false}
        title="Add/Manage Images"
        open={showAddManageImages}
        onCancel={() => setShowAddManageImages(false)}
      >
        <Paragraph>Add New Image</Paragraph>
        <Spin spinning={isUploading} tip="Uploading...">
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Supported file types: PNG/JPG/JPEG</p>
          </Dragger>
        </Spin>

        <Simplebar style={{ maxHeight: 420, paddingRight: 10 }}>
          <List
            footer={false}
            bordered={false}
            loading={isLoading}
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
                    onConfirm={() => dispatch(deleteImage(_id))}
                    description="Are you sure to delete this image?"
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
