import Header from "./Header";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
const { Content } = Layout;

const PrivateContainer = ({ children, title }) => {
  return (
    <Layout >
        <Sidebar />

      <Layout>
        <Header />
        <Content style={{ padding: "20px"}}>
            <h1 style={{fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem"}}>{title}</h1>
            {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PrivateContainer;
