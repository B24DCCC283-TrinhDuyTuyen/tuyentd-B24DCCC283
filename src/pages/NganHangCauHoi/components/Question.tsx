import { Button, Input, List, Select } from "antd"
import { useState, useEffect } from "react"
import { useModel } from "umi"

const { Option } = Select

export default function Question() {

    const { questions, fetchQuestions, createQuestion } = useModel("NganHangCauHoi.question")

    const [content, setContent] = useState("")
    const [subject, setSubject] = useState("")
    const [block, setBlock] = useState("")
    const [difficulty, setDifficulty] = useState("")

    useEffect(() => {
        fetchQuestions()
    }, [])

    const handleAdd = () => {

        createQuestion({
            id: Date.now().toString(),
            content,
            subject,
            block,
            difficulty
        })

        setContent("")
    }

    return (
        <div>
            <h2>Câu hỏi</h2>

            <Input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nội dung câu hỏi"
                style={{ width: 300 }}
            />

            <br /><br />

            <Select
                placeholder="Chọn môn học"
                style={{ width: 200 }}
                onChange={(value) => setSubject(value)}
            >
                <Option value="Web">Web</Option>
                <Option value="Java">Java</Option>
            </Select>

            <br /><br />

            <Select
                placeholder="Chọn khối kiến thức"
                style={{ width: 200 }}
                onChange={(value) => setBlock(value)}
            >
                <Option value="React">React</Option>
                <Option value="Node">NodeJS</Option>
            </Select>

            <br /><br />

            <Select
                placeholder="Độ khó"
                style={{ width: 200 }}
                onChange={(value) => setDifficulty(value)}
            >
                <Option value="Easy">Easy</Option>
                <Option value="Medium">Medium</Option>
                <Option value="Hard">Hard</Option>
            </Select>

            <br /><br />

            <Button type="primary" onClick={handleAdd}>
                Thêm
            </Button>

            <List
                style={{ marginTop: 20 }}
                dataSource={questions}
                renderItem={(item: any) => (
                    <List.Item>
                        {item.content} - {item.difficulty}
                    </List.Item>
                )}
            />
        </div>
    )
}