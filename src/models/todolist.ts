import { useState, useEffect } from 'react';
import {
    getTodos,
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

    // Phân biệt đang thêm mới hay chỉnh sửa
    const [isEdit, setIsEdit] = useState<boolean>(false);

    // Lưu todo đang được chọn để sửa
    const [row, setRow] = useState<TodoItem | undefined>();
    useEffect(() => {
        const data = getTodos()
        setTodos(data)
    }, [])


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
        isEdit,
        setIsEdit,
        row,
        setRow,
        addTodo,
        updateTodo,
        deleteTodo,
    };
};
