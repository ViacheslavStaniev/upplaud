import { Button, Avatar } from 'antd';
import CustomUpload from './CustomUpload';
import { UploadOutlined } from '@ant-design/icons';
import { getFullS3Url } from '../../config-global';

export default function HeadshotImage({ picture = '', onChange }) {
  return (
    <div className="flex-item">
      {picture && <Avatar size="large" src={getFullS3Url(picture)} />}

      <CustomUpload onComplete={onChange}>
        <Button icon={<UploadOutlined />}>Click to {picture ? 'Change' : 'Upload'}</Button>
      </CustomUpload>
    </div>
  );
}
