import { useState } from "react";
import { KnowledgeBlock, getKnowledgeBlocks, addKnowledgeBlock, updateKnowledgeBlock, deleteKnowledgeBlock } from "@/services/NganHangCauHoi/knowledgeBlock";

export default () => {

    const [blocks, setBlocks] = useState<KnowledgeBlock[]>([])
    const [loading, setLoading] = useState(false)

    const fetchBlocks = async () => {
        setLoading(true)
        try {
            const data = await getKnowledgeBlocks()
            setBlocks(data)
        } finally {
            setLoading(false)
        }
    }

    const createBlock = async (block: KnowledgeBlock) => {
        setLoading(true)
        try {
            await addKnowledgeBlock(block)
            await fetchBlocks()
        } finally {
            setLoading(false)
        }
    }

    const updateBlock = async (block: KnowledgeBlock) => {
        setLoading(true)
        try {
            await updateKnowledgeBlock(block)
            await fetchBlocks()
        } finally {
            setLoading(false)
        }
    }

    const removeBlock = async (id: string) => {
        setLoading(true)
        try {
            await deleteKnowledgeBlock(id)
            await fetchBlocks()
        } finally {
            setLoading(false)
        }
    }

    return {
        blocks,
        loading,
        fetchBlocks,
        createBlock,
        updateBlock,
        removeBlock
    }
}