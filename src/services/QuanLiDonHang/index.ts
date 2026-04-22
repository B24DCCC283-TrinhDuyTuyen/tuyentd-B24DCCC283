//Cấu trúc sản phẩm đơn hàng
export interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}
//Cấu trúc thông tin đơn hàng
export interface Order {
    id: string;
    customer: string;
    date: string;
    items: OrderItem[];
    total: number;
    status: 'pending' | 'shipping' | 'done' | 'cancel';
    createdAt: number;
    updatedAt: number;
}

const ORDER_KEY = 'order_list';

export const getOrders = (): Order[] => {
    try {
        const data = localStorage.getItem(ORDER_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

export const saveOrders = (data: Order[]): boolean => {
    try {
        localStorage.setItem(ORDER_KEY, JSON.stringify(data));
        return true;
    } catch {
        return false;
    }
};

//Tạo đối tượng mới và tính toong tiền
export const createOrder = (
    id: string,
    customer: string,
    items: OrderItem[],
    date: string,
    status: 'pending' | 'shipping' | 'done' | 'cancel'
): Order => ({
    id,
    customer,
    items,
    date,
    total: items.reduce((sum, x) => sum + (Number(x.price) * Number(x.quantity)), 0),
    status,
    createdAt: Date.now(),
    updatedAt: Date.now(),
});
//Cập nhật
export const updateOrder = (
    list: Order[],
    id: string,
    data: Partial<Omit<Order, 'id' | 'createdAt'>>
): Order[] =>
    list.map((o) =>
        o.id === id
            ? {
                ...o,
                ...data,
                total: data.items
                    ? data.items.reduce((s, x) => s + (Number(x.price) * Number(x.quantity)), 0)
                    : o.total,
                updatedAt: Date.now(),
            }
            : o
    );
//Hủy đơn hàng có điều kiện
export const cancelOrder = (list: Order[], id: string): Order[] => {
    return list.map((o) => {
        if (o.id === id && o.status === 'shipping') {
            return {
                ...o,
                status: 'cancel',
                updatedAt: Date.now()
            };
        }
        return o;
    });
};
//Lọc đơn hàng
export const filterOrders = (
    list: Order[],
    keyword?: string,
    status?: string
) => {
    const searchKey = keyword?.trim().toLowerCase() || '';

    return list.filter((o) => {
        const matchKeyword = !searchKey ||
            (o.id && o.id.toLowerCase().includes(searchKey)) ||
            (o.customer && o.customer.toLowerCase().includes(searchKey));
        const matchStatus = !status || o.status === status;
        return matchKeyword && matchStatus;
    });
};
//Sắp xếp đơn hàng
export const sortOrders = (list: Order[], field: 'date' | 'total') => {
    return [...list].sort((a, b) => {
        if (field === 'date') return new Date(a.date).getTime() - new Date(b.date).getTime();
        return a.total - b.total;
    });
};