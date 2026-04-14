import { useEffect } from 'react';
import { Divider } from 'antd';
import { useModel } from 'umi';
import TodoTable from './components/TodoTable';
import TodoForm from './components/TodoForm';

// Page chính của TodoList
const TodoPage = () => {
    const { todos } = useModel('todolist');


    return (
        <div>
            {/* Form thêm / sửa todo */}
            <TodoForm />

            <Divider />

            {/* Bảng danh sách */}
            <TodoTable data={todos} />
        </div>
    );
};

export default TodoPage;
