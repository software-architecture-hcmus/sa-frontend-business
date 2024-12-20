import { useState , useEffect} from "react";
import { Form, Input, DatePicker, Button, Upload, Space, Card, InputNumber } from "antd";
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import apiClient from "../../../utils/apiClient";
import { successNotification, errorNotification } from "../../../utils/notification";
import Url from "../../../const/Url";
import { useParams } from "react-router-dom";
import moment from "moment";

//TODO: upload image

const EventDetail = () => {
    const {id} = useParams()
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const onFinish = async (values) => {
        try {
            const response = await apiClient.post(Url.CREATE_EVENT, values)
            successNotification("Event created successfully!")
        } catch (error) {
            errorNotification(error.message)
        }
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    useEffect(() => {
        const getEventDetail = async () => {
            if(id){
                let event = await apiClient.get(Url.GET_EVENT_DETAIL.replace(":id", id));
                event = event.data.data;
                //change event.start and event.end to date
                event.start = moment(event.start)
                event.end = moment(event.end)

                if (event.vouchers) {
                    event.vouchers = event.vouchers.map(voucher => ({
                        ...voucher,
                        expiry_date: moment(voucher.expiry_date)
                    }));
                }

                console.log(event)



                form.setFieldsValue(event)
            }
        }
        getEventDetail()
    }, [id])

    return (
        <Form
            disabled={!!id}
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                name="name"
                label="Event Name"
                rules={[{ required: true, message: 'Please input event name!' }]}
            >
                <Input placeholder="Enter event name" />
            </Form.Item>

            <Form.Item
                name="image"
                label="Event Image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                //rules={[{ required: true, message: 'Please upload an image!' }]}
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

            <Form.List name="vouchers">
                {(fields, { add, remove }) => (
                    <div style={{ marginBottom: 24 }}>
                        <Card title="Vouchers">
                            {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'code']}
                                        rules={[{ required: true, message: 'Missing code' }]}
                                    >
                                        <Input placeholder="Voucher Code" />
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        name={[name, 'value']}
                                        rules={[{ required: true, message: 'Missing value' }]}
                                    >
                                        <InputNumber placeholder="Value (point to exchange)" min={0} />
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        name={[name, 'description']}
                                        rules={[{ required: true, message: 'Missing description' }]}
                                    >
                                        <Input placeholder="Description" />
                                    </Form.Item>

                                    {/* <Form.Item
                                        {...restField}
                                        name={[name, 'amount']}
                                        rules={[{ required: true, message: 'Missing amount' }]}
                                    >
                                        <InputNumber placeholder="Amount" min={1} />
                                    </Form.Item> */}

                                    <Form.Item
                                        {...restField}
                                        name={[name, 'expiry_date']}
                                        rules={[{ required: true, message: 'Missing expiry date' }]}
                                    >
                                        <DatePicker placeholder="Expiry Date" />
                                    </Form.Item>

                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add Voucher
                                </Button>
                            </Form.Item>
                        </Card>
                    </div>
                )}
            </Form.List>

            <Form.Item
                name="start"
                label="Start Date"
                rules={[{ required: true, message: 'Please select start date!' }]}
            >
                <DatePicker 
                    style={{ width: '100%' }}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                />
            </Form.Item>

            <Form.Item
                name="end"
                label="End Date"
                rules={[{ required: true, message: 'Please select end date!' }]}
            >
                <DatePicker 
                    style={{ width: '100%' }}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                />
            </Form.Item>

            <Form.Item hidden={!!id}>
                <Button type="primary" htmlType="submit">
                    Create Event
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EventDetail;