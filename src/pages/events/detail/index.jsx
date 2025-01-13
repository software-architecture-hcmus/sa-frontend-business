import { useState , useEffect} from "react";
import { Form, Input, DatePicker, Button, Upload, Space, Card, InputNumber } from "antd";
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import apiClient from "../../../utils/apiClient";
import { successNotification, errorNotification } from "../../../utils/notification";
import Url from "../../../const/Url";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import RouterUrl from "../../../const/RouterUrl";

const EventDetail = () => {
    const {id} = useParams()
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isCreateEvent, setIsCreateEvent] = useState(true);
    const navigate = useNavigate();

    const sendRequest = async (formData, isCreateEvent) => {
        let response = null;
        if (isCreateEvent) {
            response = await apiClient.post(Url.CREATE_EVENT, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }); 
        } else {
            response = await apiClient.put(Url.UPDATE_EVENT(id), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }); 
        }

        return response;
    }

    const onFinish = async (values) => {
        try {
            const formData = new FormData();
            
            // Append the file from the image field
            if (values.image?.[0]?.originFileObj) {
                formData.append('image', values.image[0].originFileObj);
            }
            
            // Append other form values
            Object.keys(values).forEach(key => {
                if (key !== 'image') {
                    let value = values[key];
                    if (key === 'vouchers') value = JSON.stringify(value);
                    formData.append(key, value);
                }
            });

            const response = await sendRequest(formData, isCreateEvent);

            if (response.data.ok) {
                successNotification(`Event ${isCreateEvent ? 'created' : 'updated' } successfully!`);
                navigate(RouterUrl.EVENT_DETAIL.replace(":id", response.data.data.id));
            }
        } catch (error) {
            errorNotification(error.message)
        }
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e.slice(-1);
        }
        return e?.fileList.slice(-1);
    };

    useEffect(() => {
        const getEventDetail = async () => {
            if(id){
                setIsCreateEvent(false);
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
                setPreviewUrl(event.image);
                delete event.image;
                form.setFieldsValue(event)
            }
        }
        getEventDetail()
    }, [id])

    const handleFileChange = ({ fileList }) => {
        const newFileList = fileList.slice(-1);
        if (newFileList.length > 0) {
            const url = URL.createObjectURL(newFileList[0].originFileObj);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null);
        }
        setFileList(newFileList);
    };

    return (
        <Form
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
                rules={[{ required: !id, message: 'Please upload an image!' }]}
            >
                <Upload
                    listType="picture"
                    maxCount={1}
                    beforeUpload={() => false}
                    fileList={fileList}
                    onChange={handleFileChange}
                    showUploadList={false}
                >
                    <Space direction="vertical">
                        {(previewUrl || fileList[0]?.url) && (
                            <img 
                                src={previewUrl || fileList[0]?.url} 
                                alt="Event preview" 
                                style={{ maxWidth: '200px', maxHeight: '200px' }}
                            />
                        )}
                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Space>
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
                                        name={[name, 'value']}
                                        rules={[{ required: true, message: 'Missing value' }]}
                                    >
                                        <InputNumber style={{ width: '200px' }} placeholder="Value (point to exchange)" min={0} />
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        name={[name, 'description']}
                                        rules={[{ required: true, message: 'Missing description' }]}
                                    >
                                        <Input placeholder="Description" />
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        name={[name, 'total_codes']}
                                        rules={[{ required: true, message: 'Missing amount' }]}
                                    >
                                        <InputNumber 
                                            placeholder="Amount" 
                                            min={form.getFieldValue('vouchers')?.[name]?.total_codes || 1} 
                                            max={5000} 
                                        />
                                    </Form.Item>

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

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {isCreateEvent ? 'Create Event' : 'Update Event'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EventDetail;