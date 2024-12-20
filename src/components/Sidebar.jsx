import { AppstoreOutlined, UserOutlined, CalendarOutlined} from "@ant-design/icons";
import RouterUrl from "../const/RouterUrl";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
const { Sider } = Layout;

const SidebarMenu = [
    {
        label: <Link to={RouterUrl.HOME}>Dashboard</Link>,
        icon: <AppstoreOutlined />,
    },
    {
        label: <Link to={RouterUrl.EVENTS}>Events</Link>,
        icon: <CalendarOutlined />,
    },
]

const Sidebar = () => {
    return (
        <Sider style={{minHeight: "100vh", backgroundColor: "white"}}>
            <div style={{textAlign: "center"}}><h1>LOGO</h1></div>
            <Menu items={SidebarMenu} />
        </Sider>
    )
}

export default Sidebar;
