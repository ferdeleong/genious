import { AudioOutlined, SearchOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useRouter } from "next/router";

const MENU_ITEMS = [
  {
    key: "home",
    path: "/",
    label: "Buscar podcasts",
    icon: <SearchOutlined />
  },
  {
    key: "create",
    path: "/create",
    label: "Crear podcast",
    icon: <AudioOutlined />
  }
];

const Sidebar: React.FC = () => {
  const router = useRouter();

  return (
    <Layout.Sider theme="dark" breakpoint="lg" collapsedWidth="80" collapsible>
      <Menu
        theme="dark"
        style={{ padding: 10 }}
        items={MENU_ITEMS.map((item) => ({
          ...item,
          onClick: () => router.push(item.path)
        }))}
      />
    </Layout.Sider>
  );
};

export default Sidebar;
