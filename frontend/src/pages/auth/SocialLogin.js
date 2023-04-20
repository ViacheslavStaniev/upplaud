import { Button } from 'antd';
import CustomIcon from '../../components/CustomIcon';

export default function SocialLogin() {
  return (
    <div className="flex-center flex-item">
      <Button type="text" shape="circle" icon={<CustomIcon name="facebook" />} />
      <Button type="text" shape="circle" icon={<CustomIcon name="linkedin" />} />
    </div>
  );
}
