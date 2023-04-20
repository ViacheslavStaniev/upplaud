import { Button, Space, Typography } from "antd";
import CustomIcon from "../../components/CustomIcon";

const { Title } = Typography;

export default function SocialMediaConnect({ showTitle = true }) {
  return (
    <>
      {showTitle && <Title level={3}>Connect with social media</Title>}

      <Space size={16}>
        <Button type='primary' shape='round' size='large' icon={<CustomIcon name='facebook' />} className='bg-1877F2 border-0'>
          Connect with Facebook
        </Button>
        <Button type='primary' shape='round' size='large' icon={<CustomIcon name='instagram' />} className='bg-instagram border-0'>
          Connect with Instagram
        </Button>
        <Button type='primary' shape='round' size='large' icon={<CustomIcon name='linkedin' />} className='bg-0A66C2 border-0'>
          Connect with LinkedIn
        </Button>
      </Space>
    </>
  );
}
