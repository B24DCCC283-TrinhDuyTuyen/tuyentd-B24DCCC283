import { useState } from "react";
import { getQuestions, addQuestion, deleteQuestion, searchQuestion, Question, updateQuestion } from "@/services/NganHangCauHoi/question";

export default () => {
    const [questions, setQuestions] = useState<Question[]>([])
    const [loading, setLoading] = useState(false)

    const fetchQuestions = async () => {
        setLoading(true)
        try {
            const data = await getQuestions()
            setQuestions(data)
        } finally {
            setLoading(false)
        }
    }

    const createQuestion = async (question: Question) => {
        setLoading(true)
        try {
            await addQuestion(question)
            await fetchQuestions()
        } finally {
            setLoading(false)
        }
    }

    const updateQuestionData = async (question: Question) => {
        setLoading(true)
        try {
            await updateQuestion(question)
            await fetchQuestions()
        } finally {
            setLoading(false)
        }
    }

    const removeQuestion = async (id: string) => {
        setLoading(true)
        try {
            await deleteQuestion(id)
            await fetchQuestions()
        } finally {
            setLoading(false)
        }
    }

    const search = async (filter: any) => {
        setLoading(true)
        try {
            const data = await searchQuestion(filter)
            setQuestions(data)
        } finally {
            setLoading(false)
        }
    }

    return {
        questions,
        loading,
        fetchQuestions,
        createQuestion,
        updateQuestionData,
        removeQuestion,
        search
    }
}