import { Button, Input, List } from "antd"
import { useState, useEffect } from "react"
import { useModel } from "umi"

export default function ExamStructure() {

    const { structures, fetchStructures, createStructure } = useModel("NganHangCauHoi.examStructure")

    const [name, setName] = useState("")
    const [subject, setSubject] = useState("")
    const [easy, setEasy] = useState("")
    const [medium, setMedium] = useState("")
    const [hard, setHard] = useState("")

    useEffect(() => {
        fetchStructures()
    }, [])

    const handleAdd = () => {

        createStructure({
            id: Date.now().toString(),
            name,
            subject,
            easy: Number(easy),
            medium: Number(medium),
            hard: Number(hard)
        })

        setName("")
        setSubject("")
        setEasy("")
        setMedium("")
        setHard("")
    }

    return (
        <div>

            <h2>Cấu trúc đề</h2>

            <Input
                placeholder="Tên cấu trúc"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <br /><br />

            <Input
                placeholder="Môn học"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            />

            <br /><br />

            <Input
                placeholder="Số câu Easy"
                value={easy}
                onChange={(e) => setEasy(e.target.value)}
            />

            <br /><br />

            <Input
                placeholder="Số câu Medium"
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
            />

            <br /><br />

            <Input
                placeholder="Số câu Hard"
                value={hard}
                onChange={(e) => setHard(e.target.value)}
            />

            <br /><br />

            <Button type="primary" onClick={handleAdd}>
                Thêm
            </Button>

            <List
                style={{ marginTop: 20 }}
                dataSource={structures}
                renderItem={(item: any) => (
                    <List.Item>
                        {item.name} - {item.subject} |
                        Easy: {item.easy} |
                        Medium: {item.medium} |
                        Hard: {item.hard}
                    </List.Item>
                )}
            />

        </div>
    )
}