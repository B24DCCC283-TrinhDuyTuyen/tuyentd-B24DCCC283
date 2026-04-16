import { useState, useEffect } from "react";
import {
    getWorkouts,
    saveWorkouts,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    toggleWorkoutStatus,
    filterWorkouts,
    getWorkoutStats,
    sortWorkouts,
    WorkoutItem
} from "@/services/QuanLiLichTapLuyenCaNhan";
import data from "@/utils/data";

export default () => {
    //Danh sách workout chính (data gốc)
    const [workOuts, setWorkOuts] = useState<WorkoutItem[]>([])
    //Trạng thái đang sửa hay không
    const [isEdit, setisEdit] = useState(false)
    //Lưu Item đang được chọn để sửa
    const [current, setCurrent] = useState<WorkoutItem | undefined>()

    //Filter + Sort
    //Tìm kiếm theo tên
    const [keyword, setkeyword] = useState('')
    //Lọc theo loại hình bài tập
    const [typeFilter, setTypeFilter] = useState<WorkoutItem['type']>()
    // Lọc theo trạng thái
    const [statusFilter, setStatusFilter] = useState<WorkoutItem['status']>()
    //Sắp xếp theo field
    const [sortBy, setSortBy] = useState<'date' | 'duration'>()

    //Load data khi components xuất hiện
    useEffect(() => {
        //Lấy dữ liệu từ Local
        setWorkOuts(getWorkouts())
    }, [])
    //Cập nhật state+ lưu Localstorage
    const updateAndSave = (data: WorkoutItem[]) => {
        setWorkOuts(data)
        saveWorkouts(data)
    }

    //CRUD
    //Thêm mới workout
    const addWorkout = (name: string, type: WorkoutItem['type'], duration: number, date: string) => {
        const newItem = createWorkout(name, type, duration, date)
        updateAndSave([...workOuts, newItem])
    }
    //Cập nhật workout
    const editWorkout = (id: string, data: Partial<Omit<WorkoutItem, 'id' | 'createAt'>>) => {
        const updated = updateWorkout(workOuts, id, data)
        updateAndSave(updated)
        //Reset trạng thái Edit
        setisEdit(false)
        setCurrent(undefined)
    }
    //Xóa workout
    const removeWorkout = (id: string) => {
        const deleted = deleteWorkout(workOuts, id)
        updateAndSave(deleted)
    }
    //Toggle trạng thái
    const toggleStatus = (id: string) => {
        const updated = toggleWorkoutStatus(workOuts, id)
        updateAndSave(updated)
    }
    //Filter
    const filtered = filterWorkouts(workOuts, {
        keyword,
        type: typeFilter,
        status: statusFilter,
    });
    //Sort
    const sorted = sortWorkouts(filtered, sortBy || 'date')
    //Stats (Tính trên dữ liệu gốc)--Thống kê
    const stats = getWorkoutStats(workOuts)
    return {
        //Data sau khi filter + sort (Đưa ra UI)
        workOuts: sorted,

        //CRUD functions
        addWorkout,
        editWorkout,
        removeWorkout,
        toggleStatus,

        //State phục vụ edit
        isEdit,
        setisEdit,
        current,
        setCurrent,

        //Filter state + setter
        keyword,
        setkeyword,
        typeFilter,
        setTypeFilter,
        statusFilter,
        setStatusFilter,

        //Sort state
        sortBy,
        setSortBy,

        //Thống kê
        ...stats
    }
}