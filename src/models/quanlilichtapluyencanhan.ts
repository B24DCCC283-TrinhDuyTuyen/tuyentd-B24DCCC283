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

export default () => {
    const [workouts, setworkouts] = useState<WorkoutItem[]>([])

}