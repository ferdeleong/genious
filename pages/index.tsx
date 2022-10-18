import { Card, Image } from "antd";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

const Home: React.FC = () => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  useEffect(() => {
    axios
      .get<CourseType[]>("/api/courses.get")
      .then(({ data }) => setCourses(data));
  }, []);
  return (
    <div className={styles.container}>
      {courses.map((course) => (
        <Card
          key={course.id}
          actions={[
            <Link key="open" href={`/course/${course.id}`}>
              Ver más
            </Link>
          ]}
          cover={
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                backgroundColor: "lightgray"
              }}
            >
              <Image
                alt={course.name}
                src={course?.imageUrl ?? ""}
                height={200}
              />
            </div>
          }
        >
          <Card.Meta title={course.name} description={course.description} />
        </Card>
      ))}
    </div>
  );
};

export default Home;
