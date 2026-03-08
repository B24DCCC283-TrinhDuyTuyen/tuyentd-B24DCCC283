import { useState } from "react";
import { Exam, getExams, generateExam } from "@/services/NganHangCauHoi/exam";

export default () => {
    const [exams, setExams] = useState<Exam[]>([])

    const fetchExams = async () => {
        const data = await getExams()
        setExams(data)
    }

    const createExam = async (structureId: string) => {
        await generateExam(structureId)
        fetchExams()
    }

    return {
        exams, fetchExams, createExam
    }
}