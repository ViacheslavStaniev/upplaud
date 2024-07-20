import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { FILE_TYPE } from '../../../utils/types';
import { getFullS3Url } from '../../../config-global';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from '../../../auth/AuthProvider';
import { deleteFile, uploadImages, generatePollImage } from '../../../reducers/fileSlice';
import {
  List,
  Form,
  Spin,
  Modal,
  Select,
  Button,
  Input,
  Avatar,
  Upload,
  Tooltip,
  Statistic,
  Typography,
  Popconfirm,
  ColorPicker,
  notification,
} from 'antd';
import { PlusOutlined, InboxOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import Simplebar from 'simplebar-react';
// import PollAudioRecord from './PollAudioRecord';
import Accordian from '../../../components/Accordian';
// import CustomUpload from '../../layouts/CustomUpload';
import SuggestionModal from '../../layouts/SuggestionModal';
import PreviewAutomationImage from './PreviewAutomationImage';

const { Option } = Select;
const { Dragger } = Upload;
const { Text, Paragraph } = Typography;

export default function PollSharingImage() {
  const { user } = useAuthContext();

  const form = Form.useFormInstance();
  const pollImageSrc = Form.useWatch('pollImageSrc', form);
  const audioDuration = Form.useWatch('audioDuration', form);
  // const socialShareFileSrc = Form.useWatch('socialShareFileSrc', form);

  // Local States
  const [countdownTime, setCountdownTime] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAddManageImages, setShowAddManageImages] = useState(false);

  // Redux States
  const dispatch = useDispatch();
  const { files, isLoading, isUploading } = useSelector((state) => state.files);
  const images = files.filter(({ type }) => type === FILE_TYPE.IMAGE);

  const getFormName = (name) => ['pollSharingImage', name];

  const TextColorFormItem = ({ label, title, formType }) => {
    return (
      <div className={`flex-item gap-2 mb-2 ${isMobile && 'flex-column full-width-cols'}`}>
        <Form.Item
          label={label}
          name={getFormName(`${formType}Text`)}
          className={isMobile ? 'w-100' : 'w-40 m-0'}
          rules={[{ max: 45, message: 'Maximum 45 character are allowed.' }]}
        >
          <Input
            maxLength={45}
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
    const formValues = form.getFieldsValue();

    const { audio, guest, pollSharingImage, hostSpeakerLabel, guestSpeakerLabel } = formValues;

    // user logo
    const pollSharingImageInfo = {
      ...pollSharingImage,
      audio,
      userLogo: guest?.picture || '',
      showLogo: images.find(({ _id }) => _id === pollSharingImage.logo)?.s3Path,
      host: {
        fontColor: '#000000',
        label: hostSpeakerLabel,
        text: `${user.firstName} ${user.lastName} ${
          user?.profile?.organization ? `(${user?.profile?.organization})` : ''
        }`,
      },
      guest: {
        fontColor: '#000000',
        label: guestSpeakerLabel,
        text: `${guest.fullName} ${guest.organization ? `(${guest.organization})` : ''}`,
      },
    };

    if (!pollSharingImageInfo.userLogo) {
      return notification.error({
        message: 'Error',
        description: 'Please upload your headshot image first.',
      });
    } else if (!pollSharingImageInfo.showLogo) {
      return notification.error({
        message: 'Error',
        description: 'Please select a logo image',
      });
    }

    setIsGenerating(true);
    setCountdownTime(audioDuration || 60);

    try {
      const { imageS3Path, videoS3Path } = await generatePollImage(pollSharingImageInfo);

      form.setFieldValue('pollImageSrc', imageS3Path);
      if (videoS3Path) form.setFieldValue('socialShareFileSrc', videoS3Path);

      notification.success({
        message: 'Success',
        description: 'Automation sharing image generated successfully',
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Error',
        description: 'Something went wrong',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const items = [
    {
      key: 'pollSharingImage',
      label: 'Customize Automation Sharing Image',
      children: (
        <>
          <div className={`flex-item gap-2 mb-2 ${isMobile && 'flex-column'}`}>
            <Form.Item
              label="LOGO IMAGE FROM"
              name={getFormName('logo')}
              className={`m-0 ${isMobile ? 'w-100' : 'w-40'}`}
            >
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
              block={isMobile}
              icon={<PlusOutlined />}
              onClick={() => setShowAddManageImages(true)}
            >
              ADD/MANAGE IMAGES
            </Button>
          </div>

          <TextColorFormItem label="HEADLINE HOOK" title="HEADLINE" formType="header" />
          <TextColorFormItem label="FOOTER BENEFIT" title="FOOTER" formType="footer" />

          {/* <PollAudioRecord name={getFormName('audio')} /> */}

          <div className={`flex-item gap-2 mt-4 ${isMobile && 'flex-column'}`}>
            <Button
              danger
              type="primary"
              block={isMobile}
              loading={isGenerating}
              onClick={onPollImageGenerateClick}
            >
              Generate Invitation Post
            </Button>
            {/* <CustomUpload
              cropShape="rect"
              aspect={1.91 / 1}
              onComplete={(value) => form.setFieldValue('pollImageSrc', value)}
            >
              <Button type="default">UPLOAD YOUR OWN</Button>
            </CustomUpload> */}

            <PreviewAutomationImage
              pollImageSrc={pollImageSrc}
              prevEl={
                <Button type="default" block={isMobile} disabled={!pollImageSrc}>
                  Preview Invitation Post
                </Button>
              }
            />

            {/* <Modal
              centered
              footer={false}
              open={showPollImagePreview}
              width={isMobile ? '100%' : '50%'}
              title="Preview Video Invitation Post"
              onCancel={() => setShowPollImagePreview(false)}
            >
              <video
                controls
                src={getFullS3Url(socialShareFileSrc)}
                style={{ width: '100%', height: 'auto' }}
              />
            </Modal> */}
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
        dispatch(uploadImages(requestBody));
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
            size="small"
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
                    onConfirm={() => dispatch(deleteFile(_id))}
                    description="Are you sure to delete this image?"
                  >
                    <Button danger size="small">
                      Delete
                    </Button>
                  </Popconfirm>,
                ]}
                className="pl-0 pr-0"
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

      <Modal
        centered
        footer={false}
        destroyOnClose
        closable={false}
        keyboard={false}
        open={isGenerating}
        maskClosable={false}
        title="Video is getting Generated..."
      >
        <Paragraph className="mt-2">
          Please wait while we generate your video. This may take a few minutes.
        </Paragraph>

        <Statistic.Countdown
          format="mm:ss"
          title="Estimated Time:"
          className="text-center wait-countdown"
          value={Date.now() + countdownTime * 3 * 1000}
          onFinish={() => setCountdownTime(audioDuration || 60)}
        />
      </Modal>
    </>
  );
}
