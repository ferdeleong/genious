import { SettingOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Menu,
  message,
  Typography,
  Upload,
  UploadFile
} from "antd";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./create.module.css";

const { Title } = Typography;
const { TextArea } = Input;

const Create: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const createCourse = async (values: {
    name: string;
    description: string;
  }) => {
    setLoading(true);
    try {
      const session = await getSession();
      const { data: course } = await axios.post<CourseType>(
        "/api/course.create",
        {
          ...values,
          email: session!.user.email
        }
      );
      for await (const file of fileList) {
        const { data } = await axios.get(
          `/api/aws/signed-url.get?courseId=${course.id}&fileName=${file.name}&fileType=${file.type}`
        );
        await axios.put(data.signedUrl, file, {
          headers: { "Content-Type": file.type }
        });
        await axios.post("/api/artifact.create", {
          name: file.name,
          type: file.type,
          url: data.fileUrl,
          courseId: course.id
        });
      }
    } catch (e) {
      message.error("No se pudo crear el curso!");
    } finally {
      setLoading(false);
      message.success("Tu contenido ha sido publicado!");
      router.push("/my-courses");
    }
  };

  return (
    <div className={styles.container}>
      <Title>Creando un curso</Title>
      <Menu
        mode="horizontal"
        defaultActiveFirst
        items={[
          {
            label: "Configuración",
            key: "configure",
            icon: <SettingOutlined />
          }
        ]}
      />
      <Card>
        <Form onFinish={createCourse}>
          <Form.Item
            label="Nombre del curso"
            name="name"
            rules={[
              { required: true, message: "Necesitas un nombre para tu curso!" }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Descripción del curso" name="description">
            <TextArea rows={4} autoSize={{ minRows: 2, maxRows: 6 }} />
          </Form.Item>
          <Form.Item>
            <Upload
              listType="picture"
              onRemove={(fileToRemove) => {
                const filesToSet = fileList.filter(
                  (file) => file.uid !== fileToRemove.uid
                );
                setFileList(filesToSet);
              }}
              beforeUpload={(file) => {
                setFileList([...fileList, file]);
                return false;
              }}
              fileList={fileList}
            >
              <Button icon={<UploadOutlined />}>
                Selecciona archivos relevantes para tu curso
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Crear curso
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Create;
