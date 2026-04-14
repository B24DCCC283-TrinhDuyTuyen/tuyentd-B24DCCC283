import { useState } from "react";
import { Exam, getExams, generateExam, deleteExam } from "@/services/NganHangCauHoi/exam";

export default () => {
    const [exams, setExams] = useState<Exam[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchExams = async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await getExams()
            setExams(data)
        } finally {
            setLoading(false)
        }
    }

    const createExam = async (structureId: string) => {
        setLoading(true)
        setError(null)
        try {
            await generateExam(structureId)
            await fetchExams()
        } catch (err: any) {
            setError(err.message || "Lỗi khi tạo đề thi")
            throw err
        } finally {
            setLoading(false)
        }
    }

    const removeExam = async (id: string) => {
        setLoading(true)
        setError(null)
        try {
            await deleteExam(id)
            await fetchExams()
        } finally {
            setLoading(false)
        }
    }

    return {
        exams,
        loading,
        error,
        fetchExams,
        createExam,
        removeExam
    }
}