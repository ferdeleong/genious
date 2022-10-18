import { Card, Image } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

const Home: React.FC = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    axios
      .get<CourseType[]>(
        router.query.q
          ? `/api/courses.get?q=${router.query.q}`
          : "/api/courses.get"
      )
      .then(({ data }) => setCourses(data));
  }, [router.query.q]);

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
