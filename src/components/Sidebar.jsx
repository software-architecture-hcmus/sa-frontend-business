import { AppstoreOutlined, CalendarOutlined, ProductOutlined} from "@ant-design/icons";
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
    {
        label: <Link to={RouterUrl.GAME}>Game</Link>,
        icon: <ProductOutlined />,
    }
]

const Sidebar = () => {
    return (
        <Sider style={{minHeight: "100vh", backgroundColor: "white"}}>
            <div style={{textAlign: "center", fontSize: "1.5rem", fontWeight: "bold", padding: "1rem"}}><h1>LOGO</h1></div>
            <Menu items={SidebarMenu} />
        </Sider>
    )
}

export default Sidebar;
