import Logo from "../components/Logo";
import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  const { Header, Footer, Content } = Layout;

  const items = ["1", "2", "3"].map((key) => ({ key, label: `nav ${key}` }));

  return (
    <Layout>
      <Header style={{ padding: 25, display: "flex", alignItems: "center", justifyContent: "space-between", background: "white" }}>
        <Link to='/'>
          <Logo />
        </Link>

        <Menu theme='light' mode='horizontal' defaultSelectedKeys={["1"]} items={items} />
      </Header>

      <Content style={{ padding: 25 }}>
        <Outlet />
      </Content>

      <Footer style={{ padding: 25 }}>Footer Menu</Footer>
    </Layout>
  );
}
