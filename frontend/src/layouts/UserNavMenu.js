import CustomIcon from '../components/CustomIcon';
import { Dropdown, Avatar, Typography } from 'antd';
import { useAuthContext } from '../auth/AuthProvider';
import { HomeOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function UserNavMenu() {
  const { logout, user } = useAuthContext();
  const userName = `${user?.firstName} ${user?.lastName}`;

  const items = [
    {
      key: 'name',
      disabled: true,
      className: 'cursor-default',
      label: (
        <div className="d-flex flex-column">
          <Text strong>{userName}</Text>
          <Text type="secondary">{user?.email}</Text>
        </div>
      ),
    },
    { type: 'divider' },
    { key: 'home', label: 'Home', icon: <HomeOutlined /> },
    { key: 'profile', label: 'Profile', icon: <UserOutlined /> },
    { key: 'settings', label: 'Settings', icon: <SettingOutlined /> },
    { type: 'divider' },
    { key: 'logout', label: 'Logout', danger: true, onClick: logout, icon: <LogoutOutlined /> },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <div className="flex-item pointer">
        <Avatar size="small" style={{ background: '#0AB6B6' }}>
          {user?.firstName.charAt(0)}
        </Avatar>
        <Text strong ellipsis className="maxw-140px">
          {userName}
        </Text>
        <CustomIcon name="chev_down" />
      </div>
    </Dropdown>
  );
}
