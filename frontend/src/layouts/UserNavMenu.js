import { useNavigate } from 'react-router-dom';
// import { PATH_DASHBOARD } from '../routes/paths';
import { Dropdown, Avatar, Typography } from 'antd';
import { useAuthContext } from '../auth/AuthProvider';
import {
  HomeOutlined,
  LogoutOutlined,
  // SettingOutlined,
  // UserOutlined
} from '@ant-design/icons';
import CustomIcon from '../components/CustomIcon';

const { Text } = Typography;
// const { profile, settings } = PATH_DASHBOARD.user;

export default function UserNavMenu() {
  const navigate = useNavigate();
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
    { key: 'home', label: 'Home', icon: <HomeOutlined />, onClick: () => navigate('/') },
    // { key: 'profile', label: 'Profile', icon: <UserOutlined />, onClick: () => navigate(profile) },
    // {
    //   key: 'settings',
    //   label: 'Settings',
    //   icon: <SettingOutlined />,
    //   onClick: () => navigate(settings),
    // },
    // { type: 'divider' },
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
