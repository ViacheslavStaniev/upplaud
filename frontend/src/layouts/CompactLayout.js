import Logo from '../components/Logo';
import { Layout, Typography } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Text } = Typography;
const { Header, Content, Footer } = Layout;

export default function CompactLayout() {
  return (
    <Layout>
      <Header className="sticky-header">
        <Link to="/">
          <Logo />
        </Link>
      </Header>

      <Content className="h-100 bg-white" style={{ paddingBottom: 50 }}>
        <Outlet />
      </Content>

      <Footer className="bg-white flex-item gap-2 space-between p-2">
        <Text type="secondary">© {new Date().getFullYear()} Upplaud. All rights reserved.</Text>
        <div className="flex-item gap-2">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-use">Terms of Use</Link>
        </div>
      </Footer>
    </Layout>
  );
}
