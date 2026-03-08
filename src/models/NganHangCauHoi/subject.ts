import { useState } from "react";
import { Subject, getSubjects, addSubject } from "@/services/NganHangCauHoi/subject";

export default function useSubjectModel() {

    const [subjects, setSubjects] = useState<Subject[]>([])

    const fetchSubjects = async () => {
        const data = await getSubjects()
        setSubjects(data)
    }

    const createSubject = async (subject: Subject) => {
        await addSubject(subject)
        fetchSubjects()
    }

    return {
        subjects,
        fetchSubjects,
        createSubject
    }
}