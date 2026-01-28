import { message } from 'antd';

// Định nghĩa cấu trúc 1 todo
export interface TodoItem {
    id: string;
    title: string;
    description?: string;
    status: 'pending' | 'completed';
    createdAt: number;
    updatedAt: number;
}

// Lưu danh sách todo vào localStorage
export const saveTodos = (todos: TodoItem[]): boolean => {
    try {
        localStorage.setItem('todolist_data', JSON.stringify(todos));
        return true;
    } catch (e) {
        message.error('Lỗi khi lưu dữ liệu');
        return false;
    }
};

// Tạo todo mới
export const createTodo = (title: string, description?: string): TodoItem => ({
    id: Date.now().toString(),
    title,
    description,
    status: 'pending',
    createdAt: Date.now(),
    updatedAt: Date.now(),
});

// Cập nhật todo trong mảng
export const updateTodoItem = (
    todos: TodoItem[],
    id: string,
    data: Partial<Pick<TodoItem, 'title' | 'description' | 'status'>>
): TodoItem[] =>
    todos.map((x) =>
        x.id === id ? { ...x, ...data, updatedAt: Date.now() } : x
    );

// Xóa todo
export const deleteTodoItem = (todos: TodoItem[], id: string): TodoItem[] =>
    todos.filter((x) => x.id !== id);
