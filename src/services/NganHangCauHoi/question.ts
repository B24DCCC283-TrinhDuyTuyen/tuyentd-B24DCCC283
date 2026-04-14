export interface Question {
    id: string;
    code: string;  // Mã câu hỏi
    subject: string;  // ID of subject
    content: string;
    difficulty: "Dễ" | "Trung bình" | "Khó" | "Rất khó";
    block: string;  // ID of knowledge block
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

let questions: Question[] = loadFromStorage("questions", []);

export async function getQuestions() {
    return questions
}

export async function addQuestion(question: Question) {
    const newQuestion: Question = {
        ...question,
        createdAt: Date.now()
    }
    questions.push(newQuestion)
    saveToStorage("questions", questions)
    return newQuestion
}

export async function updateQuestion(question: Question) {
    questions = questions.map(q => q.id === question.id ? question : q)
    saveToStorage("questions", questions)
    return question
}

export async function deleteQuestion(id: string) {
    questions = questions.filter(q => q.id !== id)
    saveToStorage("questions", questions)
}

export async function searchQuestion(filter: any) {
    return questions.filter(q => {
        return (
            (!filter.subject || q.subject === filter.subject) &&
            (!filter.block || q.block === filter.block) &&
            (!filter.difficulty || q.difficulty === filter.difficulty)
        )
    })
}

export async function getQuestionById(id: string) {
    return questions.find(q => q.id === id)
}

export async function getQuestionsBySubject(subjectId: string) {
    return questions.filter(q => q.subject === subjectId)
}