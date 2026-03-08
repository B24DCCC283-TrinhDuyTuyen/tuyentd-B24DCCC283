import { Button, Input, List } from "antd"
import { useState, useEffect } from "react"
import { useModel } from "umi"

export default function KnowledgeBlock() {

    const { blocks, fetchBlocks, createBlock } = useModel("NganHangCauHoi.knowledgeBlock")

    const [name, setName] = useState("")

    useEffect(() => {
        fetchBlocks()
    }, [])

    const handleAdd = () => {
        createBlock({
            id: Date.now().toString(),
            name
        })
        setName("")
    }

    return (
        <div>
            <h2>Khối kiến thức</h2>

            <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên khối"
            />

            <Button onClick={handleAdd}>Thêm</Button>

            <List
                dataSource={blocks}
                renderItem={(item: any) => (
                    <List.Item>{item.name}</List.Item>
                )}
            />
        </div>
    )
}