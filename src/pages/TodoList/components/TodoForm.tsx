// Component nhập dữ liệu todo (thêm / sửa)
import { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useModel } from 'umi';

const TodoForm = () => {
    const [form] = Form.useForm();

    // Lấy state & function từ model
    const { row, isEdit, addTodo, updateTodo } = useModel('todolist');

    // Submit form
    const onFinish = (values: any) => {
        if (isEdit && row) {
            updateTodo(row.id, values.title, values.description);
            message.success('Cập nhật todo thành công!');
        } else {
            addTodo(values.title, values.description);
            message.success('Thêm todo thành công!');
        }

        // Reset form sau khi submit
        form.resetFields();
    };

    // Khi sửa → đổ dữ liệu cũ vào form
    useEffect(() => {
        if (isEdit && row) {
            form.setFieldsValue({
                title: row.title,
                description: row.description,
            });
        } else {
            form.resetFields();
        }
    }, [isEdit, row]);

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
                name="title"
                label="Tiêu đề"
                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
            >
                <Input placeholder="Nhập tiêu đề" />
            </Form.Item>

            <Form.Item name="description" label="Mô tả">
                <Input.TextArea rows={4} placeholder="Nhập mô tả (tùy chọn)" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    {isEdit ? 'Cập nhật' : 'Thêm'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default TodoForm;
