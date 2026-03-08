export interface Subject {
    id: string;
    name: string;
    credits: number;
}

let subjects: Subject[] = []

export async function getSubjects() {
    return subjects
}

export async function addSubject(subject: Subject) {
    subjects.push(subject)
    return subject
}

export async function updateSubject(subject: Subject) {
    subjects = subjects.map(s => s.id === subject.id ? subject : s)
    return subject
}

export async function deleteSubject(id: string) {
    subjects = subjects.filter(s => s.id !== id)
}