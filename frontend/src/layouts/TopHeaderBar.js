import { Divider, Layout } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import UserNavMenu from './UserNavMenu';
import TopNavSearchbar from './TopNavSearchbar';
import NotificationPopover from './NotificationPopover';

const { Header } = Layout;

export default function TopHeaderBar() {
  return (
    <Header className="sticky-header flex-item space-between">
      <Link to="/">
        <Logo />
      </Link>

      <TopNavSearchbar />

      <div className="flex-item">
        <NotificationPopover />
        <Divider type="vertical" />
        <UserNavMenu />
      </div>
    </Header>
  );
}
