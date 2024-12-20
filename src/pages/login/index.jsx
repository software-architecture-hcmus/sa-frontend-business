import { useState, useEffect } from "react";
import RouterUrl from "../../const/RouterUrl";
import { Button, Form, Grid, Input, theme, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { errorNotification, successNotification } from "../../utils/notification";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { authFirebase } from "../../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { dbFirebase } from "../../utils/firebase";
import { FIREBASE_USER_COLLECTION } from "../../const/User";
import { ROLE, STATUS } from "../../const/User";
import { REGISTER_FLAG, ACCESS_TOKEN, REFRESH_TOKEN } from "../../const/LocalStorage";
const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function Login() {

  const [loading, setLoading] = useState(false);
  const { token } = useToken();
  const screens = useBreakpoint();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state &&  location.state.message) {

      if (location.state.success) {
        successNotification(location.state.message);
      }
      else{
        errorNotification(location.state.message);
      }
    }
  }, [location.state]);

  const login = async (values) => {
    try {
      setLoading(true);
      const { email, password } = values;
      const userCredential = await signInWithEmailAndPassword(authFirebase, email, password);      
      if(userCredential?.user){
        const docRef = doc(dbFirebase, FIREBASE_USER_COLLECTION, userCredential.user.uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
          const userData = docSnap.data();
          if(userData.role === ROLE.BUSINESS && userData.status === STATUS.ACTIVE){
            localStorage.removeItem(REGISTER_FLAG); // remove flag
            localStorage.setItem(ACCESS_TOKEN, userCredential.user.stsTokenManager.accessToken);
            localStorage.setItem(REFRESH_TOKEN, userCredential.user.stsTokenManager.refreshToken);
            navigate(RouterUrl.HOME);
          }
          else{
            signOut(authFirebase);
            throw new Error("You are not a business or your account is banned!");
          }
        }
        else{
          throw new Error("User not found!");
        }
      }

    } catch (error) {
      errorNotification(error.message);
    }
    finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px",
      borderRadius: token.borderRadiusSM,
      backgroundColor: "#f4f8fb",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%"
    },
    forgotPassword: {
      float: "right"
    },
    header: {
      marginBottom: token.marginXL
    },
    section: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "95vh"
    },
    text: {
      color: token.colorTextSecondary
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
      marginTop: token.marginXXS
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
        <Text style={styles.text}>
            <b>[Business portal]</b>
          </Text>
          <Title style={styles.title}>LOGIN</Title>
          <Text style={styles.text}>
            Welcome back! Please enter your details below to
            sign in.
          </Text>
        </div>
        <Form
          disabled={loading}
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={login}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block="true" type="primary" htmlType="submit" loading={loading}>
              Log in
            </Button>
            <div style={styles.footer}>
              <Text style={styles.text}>Don't have an account?</Text>{" "}
              <Link href={RouterUrl.REGISTER}>Sign up now</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}