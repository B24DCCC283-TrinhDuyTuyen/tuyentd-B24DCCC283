import { useState } from "react";
import { ExamStructure, getExamStructures, addExamStructure, updateExamStructure, deleteExamStructure } from "@/services/NganHangCauHoi/examStructure";

export default () => {
    const [structures, setStructures] = useState<ExamStructure[]>([])
    const [loading, setLoading] = useState(false)

    const fetchStructures = async () => {
        setLoading(true)
        try {
            const data = await getExamStructures()
            setStructures(data)
        } finally {
            setLoading(false)
        }
    }

    const createStructure = async (structure: ExamStructure) => {
        setLoading(true)
        try {
            await addExamStructure(structure)
            await fetchStructures()
        } finally {
            setLoading(false)
        }
    }

    const updateStructure = async (structure: ExamStructure) => {
        setLoading(true)
        try {
            await updateExamStructure(structure)
            await fetchStructures()
        } finally {
            setLoading(false)
        }
    }

    const removeStructure = async (id: string) => {
        setLoading(true)
        try {
            await deleteExamStructure(id)
            await fetchStructures()
        } finally {
            setLoading(false)
        }
    }

    return {
        structures,
        loading,
        fetchStructures,
        createStructure,
        updateStructure,
        removeStructure
    }
}