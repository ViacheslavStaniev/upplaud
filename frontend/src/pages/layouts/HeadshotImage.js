import { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { Upload, Button, Avatar } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getFullS3Url } from '../../config-global';
import { uploadAndGetS3Path } from '../../reducers/imageSlice';

export default function HeadshotImage({ picture = '', onChange }) {
  const [isUploading, setIsUploading] = useState(false);

  const props = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    accept: '.png, .gif, .jpeg, .jpg',
    customRequest: ({ file }) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          setIsUploading(true);
          const result = await uploadAndGetS3Path({ imageData: reader.result });
          setIsUploading(false);
          onChange(result?.s3Path);
        } catch (error) {
          console.log(error);
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    },
  };

  return (
    <div className="flex-item">
      {picture && <Avatar size="large" src={getFullS3Url(picture)} />}

      <ImgCrop rotationSlider cropShape="round">
        <Upload {...props}>
          <Button icon={<UploadOutlined />} loading={isUploading}>
            Click to {picture ? 'Change' : 'Upload'}
          </Button>
        </Upload>
      </ImgCrop>
    </div>
  );
}
