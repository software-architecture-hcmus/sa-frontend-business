import { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import Url from "../../const/Url";
import RouterUrl from "../../const/RouterUrl";
import { errorNotification } from "../../utils/notification";
const Game = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(Url.GET_GAME);
      if(response && response.data && response.data.data)
      {
        setGames(response.data.data);
      }
      else
      {
        setGames([]);
      }
    } catch (error) {
      errorNotification(error.message);
      setGames([]);
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
      title: "Started",
      dataIndex: "started",
      key: "started",
      render: (started) => (started ? 'true' : 'false'),
    },
    {
      title: "Allow voucher exchange",
      dataIndex: "allow_voucher_exchange",
      key: "allow_voucher_exchange",
      render: (allow_voucher_exchange) => (allow_voucher_exchange ? 'true' : 'false'),
    },
    {
      title: "instruction",
      dataIndex: "instruction",
      key: "instruction",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => navigate(RouterUrl.GAME_DETAIL.replace(":id", record.id))}>
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
        onClick={() => navigate(RouterUrl.GAME_CREATE)}
      >
        Create Game
      </Button>
      <Table
        columns={columns}
        dataSource={games}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};
export default Game;
