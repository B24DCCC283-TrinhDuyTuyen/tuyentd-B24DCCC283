import { useState, useEffect } from 'react';
import {
    getOrders,
    saveOrders,
    createOrder,
    updateOrder,
    cancelOrder,
    filterOrders,
    sortOrders,
    Order,
    OrderItem,
} from '@/services/QuanLiDonHang';

export default () => {
    //Danh sách toàn bộ đơn hàng
    const [orders, setOrders] = useState<Order[]>([]);
    //Đơn hàng được chọn sửa
    const [current, setCurrent] = useState<Order>();
    //Chỉnh sửa
    const [isEdit, setIsEdit] = useState(false);
    //Từ khóa tì, kiếm
    const [keyword, setKeyword] = useState('');
    //Lọc theo trạng thái
    const [statusFilter, setStatusFilter] = useState<string>();
    //Sắp xếp
    const [sortBy, setSortBy] = useState<'date' | 'total'>();

    //Load dữ liệu
    useEffect(() => {
        setOrders(getOrders());
    }, []);

    const updateAndSave = (data: Order[]) => {
        setOrders(data);
        saveOrders(data);
    };
    //Thêm
    const addOrder = (
        id: string,
        customer: string,
        items: OrderItem[],
        date: string,
        status: any
    ) => {
        const exists = orders.find((o) => o.id === id);
        if (exists) return alert('Mã đơn này đã tồn tại!');
        const newOrder = createOrder(id, customer, items, date, status);
        const latestOrders = getOrders();
        updateAndSave([...latestOrders, newOrder]);
    }
    //Sửa
    const editOrder = (id: string, data: Partial<Order>) => {
        updateAndSave(updateOrder(orders, id, data));
        setIsEdit(false);
        setCurrent(undefined);
    };
    //Hủy
    const cancel = (id: string) => {
        const updatedList = cancelOrder(orders, id);
        updateAndSave(updatedList)
    };
    //Tìm kiếm và sắp xếp
    const filtered = filterOrders(orders, keyword, statusFilter);
    const sorted = sortOrders(filtered, sortBy || 'date');

    return {
        orders: sorted,
        addOrder,
        editOrder,
        cancel,
        current,
        setCurrent,
        isEdit,
        setIsEdit,
        keyword,
        setKeyword,
        statusFilter,
        setStatusFilter,
        sortBy,
        setSortBy,
    };
};