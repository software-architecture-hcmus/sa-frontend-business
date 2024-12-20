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
            <h1>{title}</h1>
            {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PrivateContainer;
