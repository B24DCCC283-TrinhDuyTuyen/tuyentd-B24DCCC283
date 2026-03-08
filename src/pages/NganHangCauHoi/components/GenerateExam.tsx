import { Button, List } from "antd"
import { useEffect } from "react"
import { useModel } from "umi"

export default function GenerateExam() {

    const { exams, fetchExams, createExam } = useModel("NganHangCauHoi.exam")

    useEffect(() => {
        fetchExams()
    }, [])

    const handleGenerate = async () => {
        await createExam("1")
        fetchExams()
    }

    return (
        <div>

            <h2>Tạo đề thi</h2>

            <Button type="primary" onClick={handleGenerate}>
                Sinh đề
            </Button>

            <List
                dataSource={exams}
                renderItem={(item: any) => (
                    <List.Item>
                        {item.id} - {item.subject}
                    </List.Item>
                )}
            />

        </div>
    )
}