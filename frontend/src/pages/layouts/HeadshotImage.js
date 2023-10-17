import { Button, Avatar } from 'antd';
import CustomUpload from './CustomUpload';
import { UploadOutlined } from '@ant-design/icons';
import { getFullS3Url } from '../../config-global';

export default function HeadshotImage({ picture = '', onChange }) {
  const pictureUrl = picture
    ? picture.startsWith('http')
      ? picture
      : getFullS3Url(picture)
    : null;

  return (
    <div className="flex-item">
      {pictureUrl && <Avatar size="large" src={pictureUrl} />}

      <CustomUpload onComplete={onChange}>
        <Button icon={<UploadOutlined />}>Click to {pictureUrl ? 'Change' : 'Upload'}</Button>
      </CustomUpload>
    </div>
  );
}
