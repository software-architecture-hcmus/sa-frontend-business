import { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import Url from "../../const/Url";
import RouterUrl from "../../const/RouterUrl";
import { errorNotification } from "../../utils/notification";
import { DeleteOutlined } from "@ant-design/icons";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(Url.GET_EVENTS);
      console.log(response.data.data);
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
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await apiClient.delete(Url.DELETE_EVENT(id));
      await fetchEvents();
    } catch (error) {
      errorNotification(error.message);
    } finally {
      setLoading(false);
    }
  };
  const showDeleteModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };
  const handleModalConfirm = async () => {
    await handleDelete(selectedId);
    setIsModalOpen(false);
  };
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
      render: (_, record) => (
        <Button type="link" onClick={() => navigate(RouterUrl.EVENT_DETAIL.replace(":id", record.id))}>
          {record.name}
        </Button>
      ),
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
        <Button 
          type="link" 
          danger 
          icon={<DeleteOutlined />} 
          onClick={() => showDeleteModal(record.id)}
        />
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
      <Modal
        title="Confirm Delete"
        open={isModalOpen}
        onOk={handleModalConfirm}
        onCancel={() => setIsModalOpen(false)}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this event?</p>
      </Modal>
    </div>
  );
};
export default Events;
