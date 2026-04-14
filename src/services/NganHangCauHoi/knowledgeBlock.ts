export interface KnowledgeBlock {
    id: string
    name: string
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

let knowledgeBlocks: KnowledgeBlock[] = loadFromStorage("knowledgeBlocks", [
    { id: "KB1", name: "Tổng quan" },
    { id: 'KB2', name: 'Chuyên sâu' }
])

export async function getKnowledgeBlocks() {
    return knowledgeBlocks
}

export async function addKnowledgeBlock(block: KnowledgeBlock) {
    knowledgeBlocks.push(block)
    saveToStorage("knowledgeBlocks", knowledgeBlocks)
    return block
}

export async function updateKnowledgeBlock(block: KnowledgeBlock) {
    knowledgeBlocks = knowledgeBlocks.map(b => b.id === block.id ? block : b)
    saveToStorage("knowledgeBlocks", knowledgeBlocks)
    return block
}

export async function deleteKnowledgeBlock(id: string) {
    knowledgeBlocks = knowledgeBlocks.filter(b => b.id !== id)
    saveToStorage("knowledgeBlocks", knowledgeBlocks)
}