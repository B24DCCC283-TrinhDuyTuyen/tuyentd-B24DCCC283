export interface ExamRule {
    id: string;
    difficulty: "Dễ" | "Trung bình" | "Khó" | "Rất khó";
    block: string;  // Knowledge block ID
    count: number;  // Number of questions for this rule
}

export interface ExamStructure {
    id: string;
    name: string;
    subject: string;  // Subject ID
    rules: ExamRule[];
    totalQuestions: number;  // Total questions in the exam
    description?: string;
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

let structures: ExamStructure[] = loadFromStorage("examStructures", [])

export async function getExamStructures() {
    return structures
}

export async function addExamStructure(structure: ExamStructure) {
    const totalQuestions = structure.rules.reduce((sum, rule) => sum + rule.count, 0)
    const newStructure: ExamStructure = {
        ...structure,
        totalQuestions,
        createdAt: Date.now()
    }
    structures.push(newStructure)
    saveToStorage("examStructures", structures)
    return newStructure
}

export async function updateExamStructure(structure: ExamStructure) {
    const totalQuestions = structure.rules.reduce((sum, rule) => sum + rule.count, 0)
    structures = structures.map(s =>
        s.id === structure.id ? { ...structure, totalQuestions } : s
    )
    saveToStorage("examStructures", structures)
    return structure
}

export async function deleteExamStructure(id: string) {
    structures = structures.filter(s => s.id !== id)
    saveToStorage("examStructures", structures)
}

export async function getExamStructureById(id: string) {
    return structures.find(s => s.id === id)
}