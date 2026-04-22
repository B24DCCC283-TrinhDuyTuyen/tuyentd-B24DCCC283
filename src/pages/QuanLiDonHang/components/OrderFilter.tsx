import { Input, Select } from 'antd';
import { useModel } from 'umi';

const OrderFilter = () => {
    const { keyword, setKeyword, statusFilter, setStatusFilter } =
        useModel('quanlidonhang');

    return (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Input
                placeholder="Tìm theo mã hoặc khách hàng"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ width: 250 }}
            />

            <Select
                placeholder="Trạng thái"
                allowClear
                value={statusFilter}
                onChange={setStatusFilter}
                style={{ width: 200 }}
                options={[
                    { label: 'Chờ xác nhận', value: 'pending' },
                    { label: 'Đang giao', value: 'shipping' },
                    { label: 'Hoàn thành', value: 'done' },
                    { label: 'Hủy', value: 'cancel' },
                ]}
            />
        </div>
    );
};

export default OrderFilter;