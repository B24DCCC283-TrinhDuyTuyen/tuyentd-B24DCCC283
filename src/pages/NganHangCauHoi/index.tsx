import ExamStructure from "./components/ExamStrcuture"
import GenerateExam from "./components/GenerateExam"
import KnowledgeBlock from "./components/KnowledgeBlock"
import Subject from "./components/Subject"
import Question from "./components/Question"

export default function Page() {

    return (
        <div>

            <Subject />

            <KnowledgeBlock />

            <Question />

            <ExamStructure />

            <GenerateExam />

        </div>
    )
}