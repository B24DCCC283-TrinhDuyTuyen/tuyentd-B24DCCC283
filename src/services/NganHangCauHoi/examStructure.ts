export interface ExamStructure {
    id: string
    name: string
    subject: string
    easy: number
    medium: number
    hard: number
}

let structures: ExamStructure[] = []

export async function getExamStructures() {
    return structures
}

export async function addExamStructure(structure: ExamStructure) {
    structures.push(structure)
    return structure
}