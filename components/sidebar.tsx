import {
  FileOutlined,
  SearchOutlined,
  VideoCameraOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useRouter } from "next/router";

const MENU_ITEMS = [
  {
    key: "/",
    path: "/",
    label: "Buscar cursos",
    icon: <SearchOutlined />
  },
  {
    key: "/create",
    path: "/create",
    label: "Crear curso",
    icon: <VideoCameraOutlined />
  },
  {
    key: "/my-courses",
    path: "/my-courses",
    label: "Ver mis cursos",
    icon: <FileOutlined />
  }
];

const Sidebar: React.FC = () => {
  const router = useRouter();
  return (
    <Layout.Sider theme="dark" breakpoint="lg" collapsedWidth="80" collapsible>
      <Menu
        defaultSelectedKeys={[router.route]}
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
