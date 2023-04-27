import CustomIcon from '../components/CustomIcon';
import { Dropdown, Avatar, Typography } from 'antd';
import { useAuthContext } from '../auth/AuthProvider';

const { Text } = Typography;

export default function UserNavMenu() {
  const { logout, user } = useAuthContext();
  const userName = `${user?.firstName} ${user?.lastName}`;

  const items = [
    {
      key: 'name',
      disabled: true,
      label: (
        <div className="d-flex flex-column">
          <Text strong>{userName}</Text>
          <Text type="secondary">{user?.email}</Text>
        </div>
      ),
    },
    { type: 'divider' },
    { key: 'home', label: 'Home' },
    { key: 'profile', label: 'Profile' },
    { key: 'settings', label: 'Settings' },
    { type: 'divider' },
    { key: 'logout', label: 'Logout', danger: true, onClick: logout },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <div className="flex-item pointer">
        <Avatar size="small" style={{ background: '#0AB6B6' }}>
          T
        </Avatar>
        <Text strong>{userName}</Text>
        <CustomIcon name="chev_down" />
      </div>
    </Dropdown>
  );
}
