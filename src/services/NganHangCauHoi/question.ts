export interface Question {
    id: string;
    subject: string;
    content: string;
    difficulty: string;
    block: string;
}

let questions: Question[] = [];

export async function getQuestions() {
    return questions
}

export async function addQuestion(question: Question) {
    questions.push(question)
    return question
}

export async function deleteQuestion(id: string) {
    questions = questions.filter(q => q.id !== id)
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