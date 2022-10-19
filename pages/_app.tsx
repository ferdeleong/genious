import { Layout } from "antd";
import "antd/dist/antd.css";
import Loader from "components/loader";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import type { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import SignIn from "pages/auth/signin";
import React from "react";
import { ChildrenProps } from "types/next-auth";
import "./globals.css";

const AuthWrapper: React.FC<ChildrenProps> = ({ children }) => {
  const { status } = useSession();
  if (status === "unauthenticated") return <SignIn />;
  if (status === "loading") return <Loader />;
  return children;
};

const App = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps<{ session: Session }>) => {
  return (
    <SessionProvider session={session}>
      <AuthWrapper>
        <Layout style={{ minHeight: "100vh" }}>
          <Sidebar />
          <Layout>
            <Navbar />
            <Component {...pageProps} />
          </Layout>
        </Layout>
      </AuthWrapper>
    </SessionProvider>
  );
};

export default App;
