import { getQuestions, Question } from "./question";
import { getExamStructures } from "./examStructure";

export interface Exam {
    id: string;
    subject: string;
    structureId: string;
    questions: Question[]
    createdAt?: number;
}


function loadFromStorage<T>(key: string, defaultVal: T): T {
    try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : defaultVal
    } catch {
        return defaultVal
    }
}
function saveToStorage<T>(key: string, data: T) {
    try {
        localStorage.setItem(key, JSON.stringify(data))
    } catch { }
}

let exams: Exam[] = loadFromStorage("exams", [])

export async function generateExam(structureId: string) {
    const structures = await getExamStructures();
    const questions = await getQuestions()

    const structure = structures.find(s => s.id === structureId)

    if (!structure) {
        throw new Error('Không tìm thấy cấu trúc đề thi')
    }

    let examQuestions: Question[] = []

    structure.rules.forEach(rule => {
        const filtered = questions.filter(q =>
            q.subject === structure.subject &&
            q.difficulty === rule.difficulty &&
            q.block === rule.block
        )

        if (filtered.length < rule.count) {
            throw new Error(`Không đủ câu hỏi cho năng lực ${rule.difficulty}, khối ${rule.block}. Cần ${rule.count} câu nhưng chỉ có ${filtered.length}`)
        }

        // Fisher-Yates shuffle to randomly select questions
        const shuffled = filtered.sort(() => Math.random() - 0.5)
        examQuestions = examQuestions.concat(shuffled.slice(0, rule.count))
    })

    const exam: Exam = {
        id: 'Exam_' + Date.now(),
        subject: structure.subject,
        structureId: structure.id,
        questions: examQuestions,
        createdAt: Date.now()
    }
    exams.push(exam)
    saveToStorage("exams", exams)
    return exam
}

export async function getExams() {
    return exams
}

export async function getExamById(id: string) {
    return exams.find(e => e.id === id)
}

export async function deleteExam(id: string) {
    exams = exams.filter(e => e.id !== id)
    saveToStorage("exams", exams)
}



