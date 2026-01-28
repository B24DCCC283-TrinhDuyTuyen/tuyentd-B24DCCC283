import { useState } from 'react';
import {
    saveTodos,
    createTodo,
    updateTodoItem,
    deleteTodoItem,
    TodoItem,
} from '../services/TodoList/todolistService';

//quản lý state dùng chung cho TodoList
export default () => {
    // Danh sách todo (state chính)
    const [todos, setTodos] = useState<TodoItem[]>([]);

    // Điều khiển việc mở / đóng modal
    const [visible, setVisible] = useState<boolean>(false);

    // Phân biệt đang thêm mới hay chỉnh sửa
    const [isEdit, setIsEdit] = useState<boolean>(false);

    // Lưu todo đang được chọn để sửa
    const [row, setRow] = useState<TodoItem | undefined>();

    // Đọc danh sách todo từ localStorage
    const getTodos = () => {
        const dataLocal = localStorage.getItem('todolist_data');
        if (!dataLocal) {
            setTodos([]);
            return;
        }
        setTodos(JSON.parse(dataLocal));
    };

    // Thêm todo mới
    const addTodo = (title: string, description?: string) => {
        const newTodo = createTodo(title, description);
        const updated = [...todos, newTodo];
        setTodos(updated);
        saveTodos(updated);
    };

    // Cập nhật todo
    const updateTodo = (id: string, title: string, description?: string) => {
        const updated = updateTodoItem(todos, id, { title, description });
        setTodos(updated);
        saveTodos(updated);
    };

    // Xóa todo
    const deleteTodo = (id: string) => {
        const updated = deleteTodoItem(todos, id);
        setTodos(updated);
        saveTodos(updated);
    };

    return {
        todos,
        visible,
        setVisible,
        isEdit,
        setIsEdit,
        row,
        setRow,
        getTodos,
        addTodo,
        updateTodo,
        deleteTodo,
    };
};
