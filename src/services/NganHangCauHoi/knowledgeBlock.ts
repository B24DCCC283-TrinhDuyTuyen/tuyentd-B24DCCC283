export interface KnowledgeBlock {
    id: string
    name: string
}

let knowledgeBlocks: KnowledgeBlock[] = [
    { id: "KB1", name: "Tổng quan" },
    { id: 'KB2', name: 'Chuyên sâu' }
]

export async function getKnowledgeBlocks() {
    return knowledgeBlocks
}

export async function addKnowledgeBlock(block: KnowledgeBlock) {
    knowledgeBlocks.push(block)
    return block
}

export async function updateKnowledgeBlock(block: KnowledgeBlock) {
    knowledgeBlocks = knowledgeBlocks.map(b => b.id === block.id ? block : b)
    return block
}

export async function deleteKnowledgeBlock(id: string) {
    knowledgeBlocks = knowledgeBlocks.filter(b => b.id !== id)
}