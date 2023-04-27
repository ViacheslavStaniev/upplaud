import PropTypes from 'prop-types';
import Logo from '../components/Logo';
import AppTitle from '../components/AppTitle';
import illustration from '../assets/images/illustration.png';
import { Image, Typography, Layout } from 'antd';

LoginLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

const { Sider, Content } = Layout;

export default function LoginLayout({ children, title, pageHeading }) {
  return (
    <Layout className="h-100vh">
      <AppTitle title={title || ''} />

      <Content className="p-4" style={{ background: 'rgb(255 192 203 / 5%)' }}>
        <Logo />

        <div className="text-center p-4">
          <Typography.Title level={2}>{pageHeading || 'Hi, Welcome back'}</Typography.Title>
          <Image src={illustration} preview={false} />
        </div>
      </Content>

      <Sider theme="light" width={480} className="">
        <div className="flex-item flex-center flex-column align-items-inherit p-4 h-100 w-100">
          {children}
        </div>
      </Sider>
    </Layout>
  );
}
