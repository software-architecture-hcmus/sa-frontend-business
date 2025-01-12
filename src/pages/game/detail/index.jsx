import { useState, useEffect } from "react";
import { Form, Input, Button, Upload, Space, Card, InputNumber, Switch, Select, Radio } from "antd";
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import apiClient from "../../../utils/apiClient";
import { successNotification, errorNotification } from "../../../utils/notification";
import Url from "../../../const/Url";
import { useParams, useNavigate } from "react-router-dom";
import RouterUrl from "../../../const/RouterUrl";

const { Option } = Select;

const GameDetail = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [gameType, setGameType] = useState('');
    const [defaultGames, setDefaultGames] = useState([]);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            const response = await apiClient.post(Url.CREATE_GAME, values);
            if (response && response.status === 201) {
                console.log(response);
                successNotification("Game has been created successfully!");
                navigate(RouterUrl.GAME_DETAIL.replace(':id', response.data.data.id));
                
            }
            else{
                errorNotification("Game has been created failed!");
            }
        } catch (error) {
            errorNotification(error.message);
        }
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };


    useEffect(() => {
        const fetchEvents = async () => {
            try {
              const response = await apiClient.get(Url.GET_EVENTS);
              if (response && response.status === 200 && response.data && response.data.data)
              {
                  setEvents(response.data.data);
              }
              else
              {
                setEvents([]);
              }
            } catch (error) {
              errorNotification(error.message);
            }
          };
        fetchEvents();
      }, []);

    useEffect(() => {
        const getGameDetail = async () => {
            if (id) {
                let game = await apiClient.get(Url.GET_GAME_DETAIL.replace(":id", id));
                if (game && game.status === 200 && game.data && game.data.data)
                {
                    game = game.data.data;
                    console.log(game);
                    game['type'] = game.default_game?.game_type?.id
                    game['image'] = game.image ? [{uid: '-1', name: 'image', status: 'done', url: game.image}] : [];
                    game['event'] = game.event?.id;
                    game['play_count'] = game.game_turn[0]?.quantity;
                    form.setFieldsValue(game);
                    setGameType(game.type);
                }
            }
        };
        getGameDetail();
    }, [id]);
    useEffect(() => {
        const getDefaultGame = async () => {
            const response = await apiClient.get(Url.GET_DEFAULT_GAME);
            if(response&& response.status === 200 && response.data && response.data.data)
            {
                setDefaultGames(response.data.data);
            }
        };
        getDefaultGame();
    }, []);

    const handleGameTypeChange = (value) => {
        setGameType(value);
    };

    return (
        <Form
            disabled={!!id}
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            initialValues={{started: false, allow_voucher_exchange: true, status: "AVAILABLE"}} 
        >
            <Form.Item
                name="name"
                label="Game Name"
                rules={[{ required: true, message: 'Please input game name!' }]}
            >
                <Input placeholder="Enter game name" />
            </Form.Item>

            <Form.Item
                name="image"
                label="Game Image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
            >
                <Upload
                    listType="picture"
                    maxCount={1}
                    beforeUpload={() => false}
                    fileList={fileList}
                    onChange={({ fileList }) => setFileList(fileList)}
                >
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
            </Form.Item>

            <Form.Item
                name="type"
                label="Game Type"
                rules={[{ required: true, message: 'Please select game type!' }]}
            >
                <Select placeholder="Select game type" onChange={handleGameTypeChange}>
                    {
                        defaultGames?.map((game) => (
                            <Option key={game.game_type.id} value={game.game_type.id}>{game.name}</Option>
                        ))
                    }
                </Select>
            </Form.Item>

            {gameType === 'FLAPPYBIRD' && (
                <Form.Item
                    name="play_count"
                    label="Number of Plays"
                    rules={[{ required: true, message: 'Please input number of plays!' }]}
                >
                    <InputNumber min={1} initialvalue={10} placeholder="Enter number of plays" />
                </Form.Item>
            )}

            {gameType === 'QUIZ' && (
                <Form.List name="questions">
                    {(fields, { add, remove }) => (
                        <div style={{ marginLeft: 24, marginBottom: 24 }}>
                            <Card title="Questions">
                                {fields.map(({ key, name, ...restField }) => (
                                    <div key={key} style={{ marginBottom: 24 }}>
                                        <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'content']}
                                                rules={[{ required: true, message: 'Missing question content' }]}
                                            >
                                                <Input placeholder="Question Content" />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'image']}
                                                valuePropName="fileList"
                                                getValueFromEvent={normFile}
                                            >
                                                <Upload
                                                    listType="picture"
                                                    maxCount={1}
                                                    beforeUpload={() => false}
                                                    fileList={fileList}
                                                    onChange={({ fileList }) => setFileList(fileList)}
                                                >
                                                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                                                </Upload>
                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'cooldown']}
                                                rules={[{ required: true, message: 'Missing cooldown' }]}
                                            >
                                                <InputNumber placeholder="Cooldown" initialvalue={5} min={1} />
                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'time']}
                                                rules={[{ required: true, message: 'Missing time' }]}
                                            >
                                                <InputNumber placeholder="Time" initialvalue={15} min={1} />
                                            </Form.Item>

                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>

                                        <div style={{ marginLeft: 24, marginTop: 16, display: 'flex', flexDirection: 'row' }}>
                                            <Form.List name={[name, 'answers']}>
                                                {(answerFields) => (
                                                    <div style={{ width: '100%' }}>
                                                        {answerFields.map(({ key: answerKey, name: answerName, ...restAnswerField }) => (
                                                            <Space key={answerKey} style={{ display: 'flex', width: '100%', marginBottom: 8 }} align="start">
                                                                <Form.Item
                                                                    {...restAnswerField}
                                                                    name={[answerName, 'content']}
                                                                    rules={[{ required: true, message: 'Missing answer content' }]}
                                                                    style={{ flex: 1, marginBottom: 0, width: '100% !important' }}
                                                                >
                                                                    <Input style={{ width: '100%' }} placeholder={`Answer ${answerKey + 1} Content`} />
                                                                </Form.Item>
                                                            </Space>
                                                        ))}
                                                    </div>
                                                )}
                                            </Form.List>
                                            <Radio.Group
                                                defaultValue={0}
                                                onChange={(e) => {
                                                    // e.target.value sẽ là index (0,1,2,3) của radio được chọn
                                                    form.setFieldValue(['questions', name, 'solution'], e.target.value);
                                                }}
                                            >
                                                <Space direction="vertical">
                                                    {[0, 1, 2, 3].map(index => (
                                                        <Radio key={index} value={index}></Radio>
                                                    ))}
                                                </Space>
                                            </Radio.Group>
                                        </div>
                                    </div>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add({
                                        content: '',
                                        image: [],
                                        cooldown: 5,
                                        time: 15,
                                        answers: [{ content: '' }, { content: '' }, { content: '' }, { content: '' }],
                                        solution: 0
                                    })} block icon={<PlusOutlined />}>
                                        Add Question
                                    </Button>
                                </Form.Item>
                            </Card>
                        </div>
                    )}
                </Form.List>
            )}
            <Form.Item
                name="allow_voucher_exchange"
                label="Allow Voucher Exchange"
                valuePropName="checked"
            >
                <Switch />
            </Form.Item>

            <Form.Item
                name="instruction"
                label="Instruction"
                rules={[{ required: true, message: 'Please input instruction!' }]}
            >
                <Input.TextArea placeholder="Enter instruction" />
            </Form.Item>

            <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select status!' }]}
            >
                <Select placeholder="Select status">
                    <Option value="AVAILABLE">AVAILABLE</Option>
                    <Option value="NOT">NOT</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="started"
                label="Started"
                valuePropName="checked"
            >
                <Switch />
            </Form.Item>
            <Form.Item
                name="event"
                label="Event"
                rules={[{ required: true, message: 'Please select event' }]}
            >
                <Select placeholder="Select event type">
                    {
                        events?.map((event) => (
                            <Option key={event.id} value={event.id}>{event.name}</Option>
                        ))
                    }
                </Select>
            </Form.Item>

            <Form.Item hidden={!!id}>
                <Button type="primary" htmlType="submit">
                    {id ? "Update Game" : "Create Game"}
                </Button>
            </Form.Item>
            
        </Form>
    );
};

export default GameDetail;