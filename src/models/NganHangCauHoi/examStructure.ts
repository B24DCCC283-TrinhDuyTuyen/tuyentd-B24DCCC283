import { useState } from "react";
import { ExamStructure, getExamStructures, addExamStructure } from "@/services/NganHangCauHoi/examStructure";

export default () => {
    const [structures, setStructures] = useState<ExamStructure[]>([])

    const fetchStructures = async () => {
        const data = await getExamStructures()
        setStructures(data)
    }

    const createStructure = async (structure: ExamStructure) => {
        await addExamStructure(structure)
        fetchStructures()
    }
    return {
        structures,
        fetchStructures,
        createStructure
    }
}