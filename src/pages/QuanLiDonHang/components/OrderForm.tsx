import { Form, Input, Button, Select, DatePicker, message } from 'antd';
import { useModel } from 'umi';
import { useEffect } from 'react';
import dayjs from 'dayjs';

const products = [
    { label: 'Áo(100000)', value: 'ao', price: 100000 },
    { label: 'Quần(200000)', value: 'quan', price: 200000 },
    { label: 'Giày', value: 'giay', price: 500000 },
];

const OrderForm = () => {
    const [form] = Form.useForm();
    const { addOrder, editOrder, isEdit, setIsEdit, current, orders, } = useModel('quanlidonhang');

    const calculateTotal = (itemValues: string[] = []) =>
        itemValues.reduce((sum, val) => {
            const product = products.find((p) => p.value === val);
            return sum + (product?.price || 0);
        }, 0);
    const mapToServiceItems = (itemValues: string[]) => {
        return itemValues.map(val => {
            const p = products.find(prod => prod.value === val);
            return { productId: val, name: p?.label || '', price: p?.price || 0, quantity: 1 };
        });
    };

    useEffect(() => {
        if (isEdit && current) {
            form.setFieldsValue({
                ...current,
                items: current.items?.map(i => i.productId), // Chuyển ngược lại để Select hiển thị
                date: current.date ? dayjs(current.date) : undefined,
            });
        } else {
            form.resetFields();
        }
    }, [isEdit, current, form]);

    const onFinish = (values: any) => {
        const serviceItems = mapToServiceItems(values.items || []);
        const dateStr = values.date.format('YYYY-MM-DD');

        if (isEdit && current) {
            editOrder(current.id, { ...values, items: serviceItems, date: dateStr });
            message.success('Cập nhật thành công');
        } else {
            const isDuplicate = orders?.some((o) => o.id === values.id);
            if (isDuplicate) return message.error('Mã đơn bị trùng!');

            addOrder(values.id,
                values.customer,
                serviceItems,
                dateStr,
                status);
            message.success('Thêm thành công');
        }
        form.resetFields();
        setIsEdit(false);
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="id" label="Mã đơn" rules={[{ required: true }]}>
                <Input disabled={isEdit} />
            </Form.Item>

            <Form.Item name="customer" label="Tên khách hàng" rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}>
                <Input placeholder="Nhập họ tên khách hàng" />
            </Form.Item>

            <Form.Item name="date" label="Ngày đặt" rules={[{ required: true }]}>
                <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name="items" label="Sản phẩm" rules={[{ required: true }]}>
                <Select
                    mode="multiple"
                    options={products}
                    onChange={(vals) => form.setFieldsValue({ total: calculateTotal(vals).toLocaleString('vi-VN') + ' đ' })}
                />
            </Form.Item>

            <Form.Item name="total" label="Tổng tiền (Dự kiến)">
                <Input disabled />
            </Form.Item>

            <Form.Item name="status" label="Trạng thái" initialValue="pending">
                <Select options={[{ label: 'Chờ xác nhận', value: 'pending' }, { label: 'Đang giao', value: 'shipping' }, { label: 'Hoàn thành', value: 'done' }]} />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>{isEdit ? 'Cập nhật' : 'Thêm đơn mới'}</Button>
            {isEdit && <Button onClick={() => setIsEdit(false)} block style={{ marginTop: 8 }}>Hủy sửa</Button>}
        </Form>
    );
};

export default OrderForm;