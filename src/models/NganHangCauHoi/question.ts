import { useState } from "react";
import { getQuestions, addQuestion, deleteQuestion, searchQuestion, Question } from "@/services/NganHangCauHoi/question";

export default () => {
    const [questions, setQuestions] = useState<Question[]>([])

    const fetchQuestions = async () => {
        const data = await getQuestions()
        setQuestions(data)
    }

    const createQuestion = async (question: Question) => {
        await addQuestion(question)
        fetchQuestions()
    }

    const removeQuestion = async (id: string) => {
        await deleteQuestion(id)
        fetchQuestions()
    }

    const search = async (filter: any) => {
        const data = await searchQuestion(filter)
        setQuestions(data)
    }
    return {
        questions,
        fetchQuestions,
        createQuestion,
        removeQuestion,
        search
    }
}