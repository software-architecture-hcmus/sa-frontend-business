import { signOut } from "firebase/auth";
import { authFirebase } from "../utils/firebase";
import RouterUrl from "../const/RouterUrl";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../const/LocalStorage";

const { Header: AntdHeader } = Layout;

const Header = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const logout = () => {
    signOut(authFirebase);
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    navigate(RouterUrl.LOGIN);
  };

  const items = [
    {
      key: "user",
      label: (
        <span>
          Welcome back, <b>{user.email || "user"}</b>
        </span>
      ),
    },
    {
      key: "logout",
      label: (
        <span onClick={logout}>
          <LogoutOutlined />
        </span>
      ),
    },
  ];

  return (
    <AntdHeader style={{ backgroundColor: "white" }}>
      <Menu
        style={{
          display: "flex",
          justifyContent: "flex-end",
          backgroundColor: "white",
        }}
        mode="horizontal"
        items={items}
      />
    </AntdHeader>
  );
};

export default Header;
