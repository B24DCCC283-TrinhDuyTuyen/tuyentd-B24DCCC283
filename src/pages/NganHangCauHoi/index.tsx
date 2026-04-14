import { Tabs } from "antd"
import ExamStructure from "./components/ExamStrcuture"
import GenerateExam from "./components/GenerateExam"
import KnowledgeBlock from "./components/KnowledgeBlock"
import Subject from "./components/Subject"
import Question from "./components/Question"

const { TabPane } = Tabs

export default function Page() {
    return (
        <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="Môn học" key="1">
                <Subject />
            </TabPane>
            <TabPane tab="Khối kiến thức" key="2">
                <KnowledgeBlock />
            </TabPane>
            <TabPane tab="Câu hỏi" key="3">
                <Question />
            </TabPane>
            <TabPane tab="Cấu trúc đề thi" key="4">
                <ExamStructure />
            </TabPane>
            <TabPane tab="Đề thi" key="5">
                <GenerateExam />
            </TabPane>
        </Tabs>
    )
}