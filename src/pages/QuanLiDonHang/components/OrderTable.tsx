import { Table, Button, Popconfirm, Tag, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useModel } from 'umi';
import { Order } from '@/services/QuanLiDonHang';

const statusColor: Record<string, string> = {
    pending: 'orange',
    shipping: 'blue',
    done: 'green',
    cancel: 'red',
};

const statusLabel: Record<string, string> = {
    pending: 'Chờ xử lý',
    shipping: 'Đang giao',
    done: 'Hoàn thành',
    cancel: 'Đã hủy',
};

const OrderTable = () => {
    const { orders, setCurrent, setIsEdit, cancel } = useModel('quanlidonhang');

    const columns: ColumnsType<Order> = [
        { title: 'Mã đơn', dataIndex: 'id', key: 'id' },
        { title: 'Khách hàng', dataIndex: 'customer', key: 'customer' },
        { title: 'Ngày', dataIndex: 'date', key: 'date' },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
            render: (v) => `${Number(v || 0).toLocaleString('vi-VN')} đ`
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status: string) => (
                <Tag color={statusColor[status]}>{statusLabel[status] || status}</Tag>
            ),
        },
        {
            title: 'Hành động',
            render: (_, record) => (
                <Space>
                    <Button type="link" onClick={() => { setCurrent(record); setIsEdit(true); }}>Sửa</Button>
                    <Popconfirm
                        title="Hủy đơn hàng này?"
                        onConfirm={() => cancel(record.id)}
                        disabled={record.status !== 'shipping'}
                    >
                        <Button type="text" danger disabled={record.status !== 'shipping'}>Hủy</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return <Table rowKey="id" columns={columns} dataSource={orders} pagination={{ pageSize: 5 }} />;
};

export default OrderTable;