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
          <Card
            cover={
              <iframe
                id="webgl_iframe"
                frameBorder="0"
                allow="autoplay; fullscreen; vr"
                allowFullScreen={false}
                // mozallowfullscreen="true"
                src="https://play.unity.com/webgl/87287a80-1a07-43d6-910f-ef1d532e146e?screenshot=false&embedType=embed"
                // width="810"
                height="200"
                // onmousewheel=""
                // webkitallowfullscreen="true"
              />
            }
          >
            <Card.Meta title="Juego" description="Aprende" />
          </Card>
        </>
      )}
    </div>
  );
};

export default Course;
