import { Menu } from "antd";
import { PATH_DASHBOARD } from "../routes/paths";
import { useLocation, useNavigate } from "react-router-dom";
import CustomIcon from "../components/CustomIcon";

export default function SidebarNavMenu() {
  const iconSize = 20;

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { addGuest, automations, postingTemplate, emailTemplates, guestingAdmin } = PATH_DASHBOARD.dashboard;

  const items = [
    {
      key: "manage",
      type: "group",
      label: "Manage",
      children: [
        { key: "/", label: "Account Admin", icon: <CustomIcon name='user_account' height={iconSize} width={iconSize} /> },
        { key: addGuest, label: "Add Guest", icon: <CustomIcon name='plus_square' height={iconSize} width={iconSize} /> },
        { key: automations, label: "Automations", icon: <CustomIcon name='ul_menu' height={iconSize} width={iconSize} /> },
        {
          key: postingTemplate,
          label: "Posting Template",
          icon: <CustomIcon name='edit_square' height={iconSize} width={iconSize} />,
        },
        { key: emailTemplates, label: "Email Templates", icon: <CustomIcon name='mail' height={iconSize} width={iconSize} /> },
        { key: guestingAdmin, label: "Guesting Admin", icon: <CustomIcon name='user_square' height={iconSize} width={iconSize} /> },
      ],
    },
  ];

  return (
    <Menu
      theme='light'
      mode='inline'
      items={items}
      defaultOpenKeys={["manage"]}
      onClick={({ key }) => navigate(key)}
      selectedKeys={[pathname]}
    />
  );
}
