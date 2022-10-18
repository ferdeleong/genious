import { Card } from "antd";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

const MyCourses: React.FC = () => {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    axios
      .get<CourseType[]>(`/api/courses.get?userId=${session!.user.userId}`)
      .then(({ data }) => setCourses(data));
  }, [session]);

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

export default MyCourses;
