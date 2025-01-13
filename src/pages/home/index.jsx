import { useEffect, useState } from "react";
import { Card, Typography, Space } from "antd";
import apiClient from "../../utils/apiClient";
import Url from "../../const/Url";
import { errorNotification } from "../../utils/notification";
const { Title } = Typography;

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [budget, setBudget] = useState(0);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(Url.GET_VOUCHERS);
            setBudget(response.data.data.reduce((sum, voucher) => sum + (voucher.value * voucher.total_codes), 0));
        } catch (error) {
            errorNotification(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);


    return (
        <>
            <Space size="large" direction="vertical">
                <Space size="large" direction="horizontal">
                    <Card
                        hoverable
                        loading={loading}
                        style={{ width: 400 }}
                    >
                        <Title level={2} style={{ margin: 0 }}>{budget}</Title>
                        <Title level={5} style={{ margin: 0 }} type="secondary">Budget</Title>
                    </Card>
                </Space>
                <Space size="large" direction="horizontal">
                    
                </Space>
            </Space>
        </>
    );
}

export default Home;
