import { useEffect, useState } from "react";
import { Card, Typography, Space } from "antd";
import apiClient from "../../utils/apiClient";
import Url from "../../const/Url";
import { errorNotification } from "../../utils/notification";
import ProcessRing from "../../components/Dashboard/ProcessRing";
import Donut from "../../components/Dashboard/Donut";
const { Title } = Typography;

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [budget, setBudget] = useState(0);
    const [spending, setSpending] = useState(0);
    const [eventStats, setEventStats] = useState([]);

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

    const fetchEventStats = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(Url.GET_EVENTS_STAT);
            const data = response.data.data.map((stat) => ({ game: stat.event.name, plays: stat.playsPerEvent }));
            setEventStats(data);
        } catch (error) {
            errorNotification(error.message);
        } finally {
            setLoading(false);
        }
    }

    

    useEffect(() => {
        calculateBudget();
        calculateSpending();
        fetchEventStats();
    }, []);


    return (
        <>
            <Space size="large" direction="vertical">
                <Space size="large" direction="horizontal">
                    <Card
                        hoverable
                        loading={loading}
                        style={{ width: 300, height: 150 }}
                    >
                        <Title level={4} style={{ margin: 0 }}>Budget</Title>
                        <Title level={2} style={{ margin: 0 }}>{budget}</Title>
                    </Card>
                    <Card
                        hoverable
                        loading={loading}
                        style={{ width: 300, height: 150 }}
                    >
                        <Title level={4} style={{ margin: 0 }}>Spending</Title>
                        <Title level={2} style={{ margin: 0 }}>{spending}</Title>
                    </Card>
                    <Card
                        hoverable
                        loading={loading}
                        style={{ width: 550, height: 150 }}
                    >
                        <Title level={4} style={{ margin: 0 }}>Spending percentage</Title>
                        <ProcessRing progress={parseFloat((spending / budget).toFixed(2))} />
                    </Card>
                </Space>
                <Card size="large" hoverable style={{ width: 1200}}>
                    <Title level={4} style={{ margin: 0 }}>Number of plays per event</Title>
                    <Donut loading={loading} data={eventStats} />
                </Card>
            </Space>
        </>
    );
}

export default Home;
