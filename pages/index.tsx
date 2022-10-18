import { Card } from "antd";
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
          title={course.name}
          key={course.id}
          extra={<Link href={`/course/${course.id}`}>Ver más</Link>}
        >
          {course.description}
        </Card>
      ))}
    </div>
  );
};

export default Home;
