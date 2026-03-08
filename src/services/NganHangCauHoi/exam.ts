import { getQuestions, Question } from "./question";
import { getExamStructures, ExamStructure } from "./examStructure";

export interface Exam {
    id: string;
    subject: string;
    structureId: string;
    questions: Question[]
}

let exams: Exam[] = []
export async function generateExam(structureId: string) {
    const structures = await getExamStructures();
    const questions = await getQuestions()

    const structure = structures.find(s => s.id === structureId)

    if (!structure) {
        throw new Error('không tìm thấy cáu trúc đề thi')
    }
    let examQuestion: Question[] = []
    structure.rules.forEach(rule => {
        const filtered = questions.filter(q =>
            q.subject === structure.subject &&
            q.difficulty === rule.difficulty &&
            q.block === rule.block
        )

        if (filtered.length < rule.count) {
            throw new Error('Không đủ câu hỏi cho cấu trúc đề thi')
        }

        examQuestion = examQuestion.concat(filtered.slice(0, rule.count))
    })
    const exam: Exam = {
        id: 'Exam_' + Date.now(),
        subject: structure.subject,
        structureId: structure.id,
        questions: examQuestion
    }
    exams.push(exam)
    return exam
}

export async function getExams() {
    return exams
}

export async function deleteExam(id: string) {
    exams = exams.filter(e => e.id !== id)
}


