import { useState } from "react";
import { Subject, getSubjects, addSubject, updateSubject, deleteSubject } from "@/services/NganHangCauHoi/subject";

export default function useSubjectModel() {

    const [subjects, setSubjects] = useState<Subject[]>([])
    const [loading, setLoading] = useState(false)

    const fetchSubjects = async () => {
        setLoading(true)
        try {
            const data = await getSubjects()
            setSubjects(data)
        } finally {
            setLoading(false)
        }
    }

    const createSubject = async (subject: Subject) => {
        setLoading(true)
        try {
            await addSubject(subject)
            await fetchSubjects()
        } finally {
            setLoading(false)
        }
    }

    const updateSubjectData = async (subject: Subject) => {
        setLoading(true)
        try {
            await updateSubject(subject)
            await fetchSubjects()
        } finally {
            setLoading(false)
        }
    }

    const removeSubject = async (id: string) => {
        setLoading(true)
        try {
            await deleteSubject(id)
            await fetchSubjects()
        } finally {
            setLoading(false)
        }
    }

    return {
        subjects,
        loading,
        fetchSubjects,
        createSubject,
        updateSubjectData,
        removeSubject
    }
}