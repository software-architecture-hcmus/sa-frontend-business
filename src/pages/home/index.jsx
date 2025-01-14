import { useEffect, useState } from "react";
import { Card, Typography, Space } from "antd";
import apiClient from "../../utils/apiClient";
import Url from "../../const/Url";
import { errorNotification } from "../../utils/notification";
import ProcessRing from "../../components/Dashboard/ProcessRing";
const { Title } = Typography;

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [budget, setBudget] = useState(0);
    const [spending, setSpending] = useState(0);

    const calculateBudget = async () => {
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

    const calculateSpending = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(Url.GET_CUSTOMER_VOUCHERS);
            setSpending(response.data.data.reduce((sum, customerVoucher) => sum + customerVoucher.voucher.value, 0));
        } catch (error) {
            errorNotification(error.message);
        } finally {
            setLoading(false);
        }
    }

    

    useEffect(() => {
        calculateBudget();
        calculateSpending();
    }, []);


    return (
        <>
            <Space size="large" direction="vertical">
                <Space size="large" direction="horizontal">
                    <Card
                        hoverable
                        loading={loading}
                        style={{ width: 200, height: 150 }}
                    >
                        <Title level={4} style={{ margin: 0 }} type="secondary">Budget</Title>
                        <Title level={2}>{budget}</Title>
                    </Card>
                    <Card
                        hoverable
                        loading={loading}
                        style={{ width: 200, height: 150 }}
                    >
                        <Title level={4} style={{ margin: 0 }} type="secondary">Spending</Title>
                        <Title level={2}>{spending}</Title>
                    </Card>
                    <Card
                        hoverable
                        loading={loading}
                        style={{ width: 400, height: 150 }}
                    >
                        <Title level={4} style={{ margin: 0 }} type="secondary">Spending percentage</Title>
                        <ProcessRing progress={(spending / budget).toFixed(2)} />
                    </Card>
                </Space>
                <Space size="large" direction="horizontal">
                    
                </Space>
            </Space>
        </>
    );
}

export default Home;
