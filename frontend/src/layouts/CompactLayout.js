import Logo from '../components/Logo';
import { Layout } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Header, Content } = Layout;

export default function CompactLayout() {
  return (
    <Layout>
      <Header className="sticky-header">
        <Link to="/">
          <Logo />
        </Link>
      </Header>

      <Content className="h-100 bg-white">
        <Outlet />
      </Content>
    </Layout>
  );
}
