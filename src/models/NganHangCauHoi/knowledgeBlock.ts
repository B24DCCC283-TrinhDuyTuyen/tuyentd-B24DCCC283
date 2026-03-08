import { useState } from "react";
import { KnowledgeBlock, getKnowledgeBlocks, addKnowledgeBlock } from "@/services/NganHangCauHoi/knowledgeBlock";

export default () => {

    const [blocks, setBlocks] = useState<KnowledgeBlock[]>([])

    const fetchBlocks = async () => {
        const data = await getKnowledgeBlocks()
        setBlocks(data)
    }

    const createBlock = async (block: KnowledgeBlock) => {
        await addKnowledgeBlock(block)
        await fetchBlocks()
    }

    return {
        blocks,
        fetchBlocks,
        createBlock
    }
}