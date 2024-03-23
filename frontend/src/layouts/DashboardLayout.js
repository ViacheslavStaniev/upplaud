import Logo from '../components/Logo';
import SimpleBar from 'simplebar-react';
import UserNavMenu from './UserNavMenu';
import SidebarNavMenu from './SidebarNavMenu';
// import TopNavSearchbar from './TopNavSearchbar';
// import NotificationPopover from './NotificationPopover';
import { Layout } from 'antd';
import { Link, Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  const { Header, Sider, Content } = Layout;

  return (
    <Layout>
      <Header className="sticky-header flex-item space-between">
        {/* <Link to="/">
          <Logo />
        </Link> */}

        {/* <TopNavSearchbar /> */}

        <div className="flex-item p-2 pl-0">
          {/* <NotificationPopover /> */}
          {/* <Divider type="vertical" /> */}
          <UserNavMenu />
        </div>
      </Header>

      <Layout style={{ height: 'calc(100vh - 59px)' }}>
        <Sider width={280} className="main-menu">
          <Link to="/">
            <Logo rootClassName="p-2 sidebar-navlogo" />
          </Link>
          <SidebarNavMenu />
        </Sider>

        <Content className="bg-white h-100">
          <SimpleBar className="p-4 h-100">
            <Outlet />
          </SimpleBar>
        </Content>
      </Layout>
    </Layout>
  );
}
