import ImgCrop from 'antd-img-crop';
import { useState } from 'react';
import { Spin, Upload, message } from 'antd';
import { uploadAndGetS3Path } from '../../reducers/fileSlice';

export default function CustomUpload({ onComplete, children, cropShape = 'round', aspect = 1 }) {
  const [isUploading, setIsUploading] = useState(false);

  const beforeUpload = (file) => {
    if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.type.toLowerCase())) {
      message.error('You can only upload JPG/PNG file!');
      return false;
    }

    return true;
  };

  const props = {
    name: 'file',
    beforeUpload,
    multiple: false,
    showUploadList: false,
    accept: '.png, .jpeg, .jpg',
    customRequest: ({ file }) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          setIsUploading(true);
          const result = await uploadAndGetS3Path({ imageData: reader.result });
          setIsUploading(false);
          onComplete(result?.s3Path);
        } catch (error) {
          console.log(error);
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    },
  };

  return (
    <ImgCrop
      showReset
      rotationSlider
      aspect={aspect}
      modalOk="Upload"
      cropShape={cropShape}
      fillColor="transparent"
      beforeCrop={beforeUpload}
    >
      <Upload {...props}>
        <Spin spinning={isUploading}>{children}</Spin>
      </Upload>
    </ImgCrop>
  );
}
