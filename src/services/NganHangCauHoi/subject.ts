export interface Subject {
    id: string;
    code: string;  // Mã môn học
    name: string;
    credits: number;
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

let subjects: Subject[] = loadFromStorage("subjects", [])

export async function getSubjects() {
    return subjects
}

export async function addSubject(subject: Subject) {
    const newSubject: Subject = {
        ...subject,
        createdAt: Date.now()
    }
    subjects.push(newSubject)
    saveToStorage("subjects", subjects)
    return newSubject
}

export async function updateSubject(subject: Subject) {
    subjects = subjects.map(s => s.id === subject.id ? subject : s)
    saveToStorage("subjects", subjects)
    return subject
}

export async function deleteSubject(id: string) {
    subjects = subjects.filter(s => s.id !== id)
    saveToStorage("subjects", subjects)
}

export async function getSubjectById(id: string) {
    return subjects.find(s => s.id === id)
}