import { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import Url from "../../const/Url";
import RouterUrl from "../../const/RouterUrl";
import { errorNotification } from "../../utils/notification";
const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(Url.GET_EVENTS);
      setEvents(response.data.data);
    } catch (error) {
      errorNotification(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total Vouchers",
      dataIndex: "total_vouchers",
      key: "total_vouchers",
    },
    {
      title: "Start Date",
      dataIndex: "start",
      key: "start",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "End Date",
      dataIndex: "end",
      key: "end",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => navigate(RouterUrl.EVENT_DETAIL.replace(":id", record.id))}>
          Detail
        </Button>
      ),
    },
  ];
  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => navigate(RouterUrl.EVENT_CREATE)}
      >
        Create Event
      </Button>
      <Table
        columns={columns}
        dataSource={events}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};
export default Events;
