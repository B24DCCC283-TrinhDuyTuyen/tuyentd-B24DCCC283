import { Button, Table, Modal, Space, message, Spin, Empty, Select, Drawer, Divider, Tag, Card, Row, Col, List } from "antd"
import { useEffect, useState } from "react"
import { useModel } from "umi"
import { DeleteOutlined, EyeOutlined, PlusOutlined, FileTextOutlined } from "@ant-design/icons"
import { Exam as IExam } from "@/services/NganHangCauHoi/exam"

const difficultyColors: any = {
    "Dễ": "green",
    "Trung bình": "orange",
    "Khó": "red",
    "Rất khó": "volcano"
}

export default function GenerateExam() {

    const { exams, loading, error, fetchExams, createExam, removeExam } = useModel("NganHangCauHoi.exam")
    const { structures, fetchStructures } = useModel("NganHangCauHoi.examStructure")
    const { subjects } = useModel("NganHangCauHoi.subject")
    const { blocks } = useModel("NganHangCauHoi.knowledgeBlock")

    const [selectedStructure, setSelectedStructure] = useState<string>("")
    const [isGenerateModalVisible, setIsGenerateModalVisible] = useState(false)
    const [isDetailDrawerVisible, setIsDetailDrawerVisible] = useState(false)
    const [selectedExam, setSelectedExam] = useState<IExam | null>(null)
    const [loadingGenerate, setLoadingGenerate] = useState(false)

    useEffect(() => {
        fetchExams()
        fetchStructures()
    }, [])

    const handleOpenGenerateModal = () => {
        setSelectedStructure("")
        setIsGenerateModalVisible(true)
    }

    const handleGenerateExam = async () => {
        if (!selectedStructure) {
            message.error("Vui lòng chọn cấu trúc đề thi")
            return
        }

        setLoadingGenerate(true)
        try {
            await createExam(selectedStructure)
            message.success("Tạo đề thi thành công")
            setIsGenerateModalVisible(false)
            setSelectedStructure("")
        } catch (err: any) {
            message.error(err.message || "Tạo đề thi thất bại. Kiểm tra lại câu hỏi trong ngân hàng")
        } finally {
            setLoadingGenerate(false)
        }
    }

    const handleViewExam = (exam: IExam) => {
        setSelectedExam(exam)
        setIsDetailDrawerVisible(true)
    }

    const handleDeleteExam = (id: string) => {
        Modal.confirm({
            title: "Xoá đề thi",
            content: "Bạn có chắc muốn xoá đề thi này?",
            okText: "Xoá",
            cancelText: "Huỷ",
            onOk: async () => {
                try {
                    await removeExam(id)
                    message.success("Xoá đề thi thành công")
                } catch (error) {
                    message.error("Có lỗi xảy ra")
                }
            }
        })
    }

    const getSubjectName = (id: string) => subjects.find(s => s.id === id)?.name || id
    const getBlockName = (id: string) => blocks.find(b => b.id === id)?.name || id
    const getStructureName = (id: string) => structures.find(s => s.id === id)?.name || id

    const columns = [
        {
            title: "ID Đề thi",
            dataIndex: "id",
            key: "id",
            width: 150,
            render: (id: string) => <span style={{ fontSize: 12, fontFamily: "monospace" }}>{id}</span>
        },
        {
            title: "Môn học",
            dataIndex: "subject",
            key: "subject",
            width: 150,
            render: (id: string) => getSubjectName(id)
        },
        {
            title: "Cấu trúc",
            dataIndex: "structureId",
            key: "structureId",
            width: 150,
            render: (id: string) => getStructureName(id)
        },
        {
            title: "Số câu hỏi",
            dataIndex: "questions",
            key: "questions",
            width: 100,
            align: "center" as const,
            render: (questions: any[]) => <Tag>{questions.length}</Tag>
        },
        {
            title: "Thao tác",
            key: "action",
            width: 150,
            align: "center" as const,
            render: (_: any, record: IExam) => (
                <Space>
                    <Button
                        type="primary"
                        size="small"
                        icon={<EyeOutlined />}
                        onClick={() => handleViewExam(record)}
                    >
                        Xem
                    </Button>
                    <Button
                        danger
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteExam(record.id)}
                    />
                </Space>
            )
        }
    ]

    return (
        <div style={{ marginBottom: 30 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h2 style={{ margin: 0 }}>Quản lý đề thi</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleOpenGenerateModal}
                >
                    Tạo đề thi mới
                </Button>
            </div>

            {error && (
                <div style={{ color: "red", marginBottom: 10 }}>
                    ⚠ {error}
                </div>
            )}

            <Spin spinning={loading}>
                {exams.length > 0 ? (
                    <Table
                        columns={columns}
                        dataSource={exams}
                        rowKey="id"
                        pagination={{ pageSize: 10 }}
                        size="middle"
                        scroll={{ x: 900 }}
                    />
                ) : (
                    <Empty description="Không có đề thi nào" />
                )}
            </Spin>

            <Modal
                title="Tạo đề thi mới"
                visible={isGenerateModalVisible}
                onOk={handleGenerateExam}
                onCancel={() => setIsGenerateModalVisible(false)}
                okText="Tạo đề"
                cancelText="Huỷ"
                confirmLoading={loadingGenerate}
            >
                <div style={{ marginBottom: 15 }}>
                    <label style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}>Chọn cấu trúc đề thi</label>
                    <Select
                        placeholder="Chọn cấu trúc"
                        value={selectedStructure || undefined}
                        onChange={setSelectedStructure}
                        style={{ width: "100%" }}
                    >
                        {structures.map(s => (
                            <Select.Option key={s.id} value={s.id}>
                                {s.name} ({getSubjectName(s.subject)})
                            </Select.Option>
                        ))}
                    </Select>
                </div>

                {selectedStructure && (
                    <div style={{ marginTop: 15, padding: 10, backgroundColor: "#f5f5f5", borderRadius: 4 }}>
                        {structures.find(s => s.id === selectedStructure) && (
                            <div>
                                <h4>Cấu trúc chi tiết:</h4>
                                <div style={{ fontSize: 12 }}>
                                    <div>Tổng số câu hỏi: <strong>{structures.find(s => s.id === selectedStructure)?.totalQuestions}</strong></div>
                                    <div style={{ marginTop: 10 }}>
                                        <strong>Quy tắc:</strong>
                                        {structures.find(s => s.id === selectedStructure)?.rules.map((rule, idx) => (
                                            <div key={idx} style={{ marginLeft: 10, marginTop: 5 }}>
                                                • {rule.difficulty} - {getBlockName(rule.block)}: {rule.count} câu
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Modal>

            <Drawer
                title={selectedExam ? `Đề thi #${selectedExam.id}` : "Chi tiết đề thi"}
                placement="right"
                onClose={() => setIsDetailDrawerVisible(false)}
                visible={isDetailDrawerVisible}
                width={800}
            >
                {selectedExam && (
                    <div>
                        <Card style={{ marginBottom: 20 }}>
                            <Row gutter={16}>
                                <Col xs={24} sm={12}>
                                    <div><strong>ID Đề thi:</strong></div>
                                    <div style={{ fontSize: 12, fontFamily: "monospace", marginTop: 5 }}>{selectedExam.id}</div>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <div><strong>Môn học:</strong></div>
                                    <div>{getSubjectName(selectedExam.subject)}</div>
                                </Col>
                                <Col xs={24} sm={12} style={{ marginTop: 15 }}>
                                    <div><strong>Cấu trúc:</strong></div>
                                    <div>{getStructureName(selectedExam.structureId)}</div>
                                </Col>
                                <Col xs={24} sm={12} style={{ marginTop: 15 }}>
                                    <div><strong>Tổng câu hỏi:</strong></div>
                                    <div><Tag>{selectedExam.questions.length}</Tag></div>
                                </Col>
                            </Row>
                        </Card>

                        <Divider>DANH SÁCH CÂU HỎI</Divider>

                        <List
                            dataSource={selectedExam.questions}
                            renderItem={(question, index) => (
                                <List.Item
                                    key={question.id}
                                    style={{ borderBottom: "1px solid #f0f0f0", padding: "10px 0" }}
                                >
                                    <List.Item.Meta
                                        title={
                                            <div>
                                                <span style={{ marginRight: 10 }}><strong>Câu {index + 1}: {question.code}</strong></span>
                                                <Tag color={difficultyColors[question.difficulty]}>{question.difficulty}</Tag>
                                                <Tag style={{ marginLeft: 5 }}>{getBlockName(question.block)}</Tag>
                                            </div>
                                        }
                                        description={
                                            <div style={{ marginTop: 10, color: "#000" }}>
                                                {question.content}
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />

                        <Divider />

                        <div style={{ marginTop: 20 }}>
                            <Button
                                type="primary"
                                block
                                icon={<FileTextOutlined />}
                                onClick={() => {
                                    message.info("Chức năng in sẽ được thêm trong phiên bản tiếp theo")
                                }}
                            >
                                In đề thi
                            </Button>
                        </div>
                    </div>
                )}
            </Drawer>
        </div>
    )
}