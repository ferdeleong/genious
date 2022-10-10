import { AudioOutlined, SettingOutlined } from "@ant-design/icons";
import { Card, Menu, Typography, Image } from "antd";
import { ReactElement, useState } from "react";
import styles from "./create.module.css";

const { Title } = Typography;

const testPodcast = {
  id: "1",
  title: "Podcast 1",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
};

const Create: React.FC = () => {
  const [child, setChild] = useState<ReactElement>(
    <Card>{testPodcast.description}</Card>
  );

  return (
    <div className={styles.container}>
      <Title>Creando un podcast</Title>
      <Menu
        mode="horizontal"
        defaultActiveFirst
        items={[
          {
            label: "Grabar",
            key: "record",
            icon: <AudioOutlined />,
            onClick: () => setChild(<Card>{testPodcast.description}</Card>)
          },
          {
            label: "Configuración",
            key: "configure",
            icon: <SettingOutlined />,
            onClick: () => setChild(<Card>{testPodcast.description}</Card>)
          }
        ]}
      />
      <Card>
        <Image src="/recorder.jpeg" alt="recorder" />
      </Card>
    </div>
  );
};

export default Create;
