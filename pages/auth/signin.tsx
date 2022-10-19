// @ts-nocheck
import { Button, Card, Typography } from "antd";
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "./signin.module.css";

const { Title } = Typography;

export default function SignIn() {
  const [providers, setProviders] = useState();

  useEffect(() => {
    getProviders().then((_providers) => setProviders(_providers!));
  }, []);

  return (
    <div className={styles.layout}>
      <Card
        title={
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Title style={{ color: "white" }}>Bienvenido</Title>
          </div>
        }
        style={{
          backgroundColor: "whitesmoke",
          width: "30vw",
          height: "36vh",
          marginRight: "-47vw",
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "none",
          border: "none"
          // backgroundColor: "rgba(255, 255, 255, .9)"
        }}
      >
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <Button
                size="large"
                type="primary"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                block
              >
                Inicia sesión con {provider.name}
              </Button>
            </div>
          ))}
      </Card>
    </div>
  );
}
