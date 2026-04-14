

export interface WorkoutItem {
    id: string;
    name: string;
    type: 'cardio' | 'gym' | 'run' | 'other';
    duration: number;
    date: string;
    status: 'pending' | 'done';
    createAt: number;
    updateAt: number;
};
const workout_key = 'workout_list'

export const getWorkouts = (): WorkoutItem[] => {
    try {
        const data = localStorage.getItem(workout_key);
        return data ? JSON.parse(data) : []
    } catch (e) {
        return []
    }
}

export const saveWorkouts = (data: WorkoutItem[]): boolean => {
    try {
        localStorage.setItem(workout_key, JSON.stringify(data))
        return true
    } catch (e) {
        return false
    }
}
// Tạo workout mới
export const createWorkout = (
    name: string,
    type: WorkoutItem['type'],
    duration: number,
    date: string
): WorkoutItem => ({
    id: crypto.randomUUID(),
    name,
    type,
    duration,
    date,
    status: 'pending',
    createAt: Date.now(),
    updateAt: Date.now()
})
// Updtae
export const updateWorkout = (
    list: WorkoutItem[],
    id: string,
    data: Partial<Omit<WorkoutItem, 'id' | 'createAt'>>
): WorkoutItem[] =>
    list.map((item) =>
        item.id === id ? { ...item, ...data, updateAt: Date.now() } : item
    )
// Xóa 
export const deleteWorkout = (list: WorkoutItem[], id: string): WorkoutItem[] =>
    list.filter((item) => item.id !== id)

// Toggle trạng thái
export const toggleWorkoutStatus = (
    list: WorkoutItem[],
    id: string
): WorkoutItem[] =>
    list.map((item) =>
        item.id === id ? { ...item, status: item.status === 'pending' ? 'done' : 'pending', updateAt: Date.now() } : item
    )

// Filter + Search
export const filterWorkouts = (
    list: WorkoutItem[],
    {
        keyword,
        type,
        status,
    }: {
        keyword?: string;
        type?: string;
        status?: string;
    }
): WorkoutItem[] => {
    return list.filter((item) => {
        return (
            (!keyword || item.name.toLowerCase().includes(keyword.toLowerCase())) &&
            (!type || item.type === type) &&
            (!status || item.status === status)
        )
    })
}

// Thống kê 
export const getWorkoutStats = (list: WorkoutItem[]) => {
    const total = list.length;
    const done = list.filter((x) => x.status === 'done').length;
    const totalDuration = list.reduce((sum, x) => sum + x.duration, 0)

    return {
        total,
        done,
        pending: total - done,
        totalDuration,
    }
}

//Sắp xếp 
export const sortWorkouts = (
    list: WorkoutItem[],
    field: 'date' | 'duration'
): WorkoutItem[] => {
    return [...list].sort((a, b) => {
        if (field === 'date') {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        return a.duration - b.duration;
    });
};