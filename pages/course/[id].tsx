import { InfoCircleOutlined } from "@ant-design/icons";
import { Card, List, Menu, Tag, Typography } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./[id].module.css";

const { Title, Paragraph } = Typography;

const Course: React.FC = () => {
  const router = useRouter();
  const [course, setCourse] = useState<CourseType>();
  const [artifacts, setArtifacts] = useState<ArtifactType[]>();

  useEffect(() => {
    axios
      .get<CourseType>(`/api/course.get?courseId=${router.query.id}`)
      .then(({ data }) => setCourse(data));
  }, [router.query.id]);

  useEffect(() => {
    if (course) {
      axios
        .get<ArtifactType[]>(`/api/artifacts.get?courseId=${router.query.id}`)
        .then(({ data }) => setArtifacts(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course]);

  return (
    <div className={styles.container}>
      {course && (
        <>
          <Title>{course.name}</Title>
          <Menu
            mode="horizontal"
            defaultActiveFirst
            items={[
              {
                label: "Contenido",
                key: "content",
                icon: <InfoCircleOutlined />,
                disabled: true
              }
            ]}
          />
          <Card>
            <Paragraph>{course.description}</Paragraph>
            <List
              size="small"
              bordered
              dataSource={artifacts}
              renderItem={(artifact) => (
                <List.Item>
                  <a href={artifact.url} target="_blank" rel="noreferrer">
                    {artifact.name}
                  </a>
                  <Tag color="geekblue">{artifact.type}</Tag>
                </List.Item>
              )}
            />
          </Card>
        </>
      )}
    </div>
  );
};

export default Course;
