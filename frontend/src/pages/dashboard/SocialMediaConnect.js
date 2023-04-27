import { Button, Space, Typography } from 'antd';
import CustomIcon from '../../components/CustomIcon';

const { Title } = Typography;

export default function SocialMediaConnect({ showTitle = true }) {
  return (
    <>
      {showTitle && <Title level={3}>Connect with social media</Title>}

      <Space size={16}>
        <Button size="large" shape="round" type="facebook" icon={<CustomIcon name="facebook" />}>
          Connect with Facebook
        </Button>

        {/* <Button hidden size="large" shape="round" type="instagram" icon={<CustomIcon name="instagram" />}>
          Connect with Instagram
        </Button> */}

        <Button size="large" shape="round" type="linkedin" icon={<CustomIcon name="linkedin" />}>
          Connect with LinkedIn
        </Button>
      </Space>
    </>
  );
}
