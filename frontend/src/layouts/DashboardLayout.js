import Logo from '../components/Logo';
import SimpleBar from 'simplebar-react';
import UserNavMenu from './UserNavMenu';
import SidebarNavMenu from './SidebarNavMenu';
// import TopNavSearchbar from './TopNavSearchbar';
// import NotificationPopover from './NotificationPopover';
import { useState } from 'react';
import { Button, Drawer, Layout } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import { isMobile, isDesktop } from 'react-device-detect';

export default function DashboardLayout() {
  const { Header, Sider, Content } = Layout;
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <Layout>
      <Header className="sticky-header flex-item space-between">
        {isMobile && (
          <div className="flex-item gap-1">
            <Button size="large" icon={<MenuOutlined />} onClick={() => setShowDrawer(true)} />
            <Link to="/">
              <Logo className="w-80px max-h-48px" />
            </Link>
          </div>
        )}

        {/* <TopNavSearchbar /> */}

        <div className={`flex-item ${isDesktop ? 'p-2 pl-0' : ''}`}>
          {/* <NotificationPopover /> */}
          {/* <Divider type="vertical" /> */}
          <UserNavMenu />
        </div>
      </Header>

      <Layout style={{ height: `calc(100vh - ${isMobile ? 72 : 59}px` }}>
        {isMobile && (
          <Drawer
            height="100%"
            placement="left"
            open={showDrawer}
            title="Upplaud Menu"
            className="main-menu"
            onClose={() => setShowDrawer(false)}
          >
            <Link to="/">
              <Logo rootClassName="p-2 sidebar-navlogo" />
            </Link>
            <SidebarNavMenu onMenuClick={() => setShowDrawer(false)} />
          </Drawer>
        )}

        {isDesktop && (
          <Sider width={280} className="main-menu">
            <Link to="/">
              <Logo rootClassName="p-2 sidebar-navlogo" />
            </Link>
            <SidebarNavMenu />
          </Sider>
        )}

        <Content className="bg-white h-100">
          <SimpleBar className={`h-100 ${isMobile ? 'p-2' : 'p-4'}`}>
            <Outlet />
          </SimpleBar>
        </Content>
      </Layout>
    </Layout>
  );
}
