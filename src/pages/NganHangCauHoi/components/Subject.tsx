import { Button, Input, List } from "antd"
import { useState, useEffect } from "react"
import { useModel } from "umi"

export default function Subject() {

    const { subjects, fetchSubjects, createSubject } = useModel("NganHangCauHoi.subject")
    const [name, setName] = useState("")

    useEffect(() => {
        fetchSubjects()
    }, [])

    const handleAdd = () => {
        createSubject({
            id: Date.now().toString(),
            name: name,
            credits: 3
        })
        setName("")
    }

    return (
        <div>
            <h2>Môn học</h2>

            <Input
                placeholder="Tên môn học"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <Button onClick={handleAdd}>Thêm</Button>

            <List
                dataSource={subjects}
                renderItem={(item: any) => (
                    <List.Item>{item.name}</List.Item>
                )}
            />
        </div>
    )
}