import { AudioOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Card, Menu, Typography } from "antd";
import { ReactElement, useState } from "react";
import styles from "./[id].module.css";

const { Title } = Typography;

const testPodcast = {
  id: "1",
  title: "Podcast 1",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
};

const Podcast: React.FC = () => {
  const [child, setChild] = useState<ReactElement>(
    <Card>{testPodcast.description}</Card>
  );

  return (
    <div className={styles.container}>
      <Title>{testPodcast.title}</Title>
      <Menu
        mode="horizontal"
        defaultActiveFirst
        items={[
          {
            label: "Descripción",
            key: "description",
            icon: <InfoCircleOutlined />,
            onClick: () => setChild(<Card>{testPodcast.description}</Card>)
          },
          {
            label: "Escuchar",
            key: "player",
            icon: <AudioOutlined />
          }
        ]}
      />
      {child}
    </div>
  );
};

export default Podcast;
