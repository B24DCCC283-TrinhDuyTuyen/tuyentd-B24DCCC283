// Component hiển thị danh sách todo
import { Button, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useModel } from 'umi';
import { TodoItem } from '@/services/TodoList/todolistService';

interface Props {
    data: TodoItem[];
}

const TodoTable = ({ data }: Props) => {
    const { setRow, setIsEdit, deleteTodo } = useModel('todolist');

    const columns: ColumnsType<TodoItem> = [
        { title: 'Tiêu đề', dataIndex: 'title' },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            render: (text) => text || '-',
        },
        {
            title: 'Hành động',
            render: (_, record) => (
                <>
                    {/* Nút sửa: đổ dữ liệu lên form */}
                    <Button
                        onClick={() => {
                            setRow(record);
                            setIsEdit(true);
                        }}
                    >
                        Sửa
                    </Button>

                    {/* Nút xóa */}
                    <Button
                        danger
                        style={{ marginLeft: 8 }}
                        onClick={() => {
                            deleteTodo(record.id);
                            message.success('Xóa todo thành công!');
                        }}
                    >
                        Xóa
                    </Button>
                </>
            ),
        },
    ];

    return <Table rowKey="id" columns={columns} dataSource={data} />;
};

export default TodoTable;
