import { Button, Table, Input, Form, Modal, Space, message, Spin, Empty, Select, Tooltip, Tag } from "antd"
import { useState, useEffect } from "react"
import { useModel } from "umi"
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons"
import { Question as IQuestion } from "@/services/NganHangCauHoi/question"

const difficultyColors: any = {
    "Dễ": "green",
    "Trung bình": "orange",
    "Khó": "red",
    "Rất khó": "volcano"
}

export default function Question() {

    const { questions, loading, fetchQuestions, createQuestion, updateQuestionData, removeQuestion, search } = useModel("NganHangCauHoi.question")
    const { subjects } = useModel("NganHangCauHoi.subject")
    const { blocks } = useModel("NganHangCauHoi.knowledgeBlock")

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [editingQuestion, setEditingQuestion] = useState<IQuestion | null>(null)
    const [form] = Form.useForm()
    const [searchText, setSearchText] = useState("")
    const [filterSubject, setFilterSubject] = useState<string | undefined>()
    const [filterBlock, setFilterBlock] = useState<string | undefined>()
    const [filterDifficulty, setFilterDifficulty] = useState<string | undefined>()

    useEffect(() => {
        fetchQuestions()
    }, [])

    useEffect(() => {
        search({ subject: filterSubject, block: filterBlock, difficulty: filterDifficulty })
    }, [filterSubject, filterBlock, filterDifficulty])

    const handleOpenModal = (question?: IQuestion) => {
        if (question) {
            setEditingQuestion(question)
            form.setFieldsValue({
                code: question.code,
                content: question.content,
                subject: question.subject,
                block: question.block,
                difficulty: question.difficulty
            })
        } else {
            setEditingQuestion(null)
            form.resetFields()
        }
        setIsModalVisible(true)
    }

    const handleCloseModal = () => {
        setIsModalVisible(false)
        form.resetFields()
        setEditingQuestion(null)
    }

    const handleSubmit = async (values: any) => {
        try {
            if (editingQuestion) {
                await updateQuestionData({
                    ...editingQuestion,
                    ...values
                })
                message.success("Cập nhật câu hỏi thành công")
            } else {
                await createQuestion({
                    id: 'Question_' + Date.now(),
                    ...values
                })
                message.success("Thêm câu hỏi thành công")
            }
            handleCloseModal()
        } catch (error) {
            message.error("Có lỗi xảy ra")
        }
    }

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: "Xoá câu hỏi",
            content: "Bạn có chắc muốn xoá câu hỏi này?",
            okText: "Xoá",
            cancelText: "Huỷ",
            onOk: async () => {
                try {
                    await removeQuestion(id)
                    message.success("Xoá câu hỏi thành công")
                } catch (error) {
                    message.error("Có lỗi xảy ra")
                }
            }
        })
    }

    const filteredQuestions = questions.filter(q =>
        q.code.toLowerCase().includes(searchText.toLowerCase()) ||
        q.content.toLowerCase().includes(searchText.toLowerCase())
    )

    const getSubjectName = (id: string) => subjects.find(s => s.id === id)?.name || id
    const getBlockName = (id: string) => blocks.find(b => b.id === id)?.name || id

    const columns = [
        {
            title: "Mã câu",
            dataIndex: "code",
            key: "code",
            width: 100,
            sorter: (a: IQuestion, b: IQuestion) => a.code.localeCompare(b.code)
        },
        {
            title: "Nội dung",
            dataIndex: "content",
            key: "content",
            render: (text: string) => (
                <Tooltip title={text}>
                    <div style={{ maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {text}
                    </div>
                </Tooltip>
            )
        },
        {
            title: "Môn học",
            dataIndex: "subject",
            key: "subject",
            width: 120,
            render: (id: string) => getSubjectName(id)
        },
        {
            title: "Khối kiến thức",
            dataIndex: "block",
            key: "block",
            width: 120,
            render: (id: string) => getBlockName(id)
        },
        {
            title: "Độ khó",
            dataIndex: "difficulty",
            key: "difficulty",
            width: 100,
            render: (difficulty: string) => (
                <Tag color={difficultyColors[difficulty] || "default"}>
                    {difficulty}
                </Tag>
            )
        },
        {
            title: "Thao tác",
            key: "action",
            width: 100,
            align: "center" as const,
            render: (_: any, record: IQuestion) => (
                <Space>
                    <Button
                        type="primary"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => handleOpenModal(record)}
                    />
                    <Button
                        danger
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                    />
                </Space>
            )
        }
    ]

    return (
        <div style={{ marginBottom: 30 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h2 style={{ margin: 0 }}>Quản lý câu hỏi tự luận</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => handleOpenModal()}
                >
                    Thêm câu hỏi
                </Button>
            </div>

            <div style={{ marginBottom: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Input.Search
                    placeholder="Tìm kiếm mã hoặc nội dung"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ maxWidth: 250 }}
                />

                <Select
                    placeholder="Lọc theo môn học"
                    allowClear
                    style={{ minWidth: 200 }}
                    value={filterSubject}
                    onChange={setFilterSubject}
                >
                    {subjects.map(s => (
                        <Select.Option key={s.id} value={s.id}>{s.name}</Select.Option>
                    ))}
                </Select>

                <Select
                    placeholder="Lọc theo khối kiến thức"
                    allowClear
                    style={{ minWidth: 200 }}
                    value={filterBlock}
                    onChange={setFilterBlock}
                >
                    {blocks.map(b => (
                        <Select.Option key={b.id} value={b.id}>{b.name}</Select.Option>
                    ))}
                </Select>

                <Select
                    placeholder="Lọc theo độ khó"
                    allowClear
                    style={{ minWidth: 150 }}
                    value={filterDifficulty}
                    onChange={setFilterDifficulty}
                >
                    <Select.Option value="Dễ">Dễ</Select.Option>
                    <Select.Option value="Trung bình">Trung bình</Select.Option>
                    <Select.Option value="Khó">Khó</Select.Option>
                    <Select.Option value="Rất khó">Rất khó</Select.Option>
                </Select>
            </div>

            <Spin spinning={loading}>
                {filteredQuestions.length > 0 ? (
                    <Table
                        columns={columns}
                        dataSource={filteredQuestions}
                        rowKey="id"
                        pagination={{ pageSize: 10 }}
                        size="middle"
                        scroll={{ x: 1000 }}
                    />
                ) : (
                    <Empty description="Không có dữ liệu" />
                )}
            </Spin>

            <Modal
                title={editingQuestion ? "Cập nhật câu hỏi" : "Thêm câu hỏi"}
                visible={isModalVisible}
                onOk={() => form.submit()}
                onCancel={handleCloseModal}
                okText="Lưu"
                cancelText="Huỷ"
                width={700}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Mã câu hỏi"
                        name="code"
                        rules={[
                            { required: true, message: "Vui lòng nhập mã câu hỏi" }
                        ]}
                    >
                        <Input placeholder="VD: Q001" />
                    </Form.Item>

                    <Form.Item
                        label="Nội dung câu hỏi"
                        name="content"
                        rules={[
                            { required: true, message: "Vui lòng nhập nội dung câu hỏi" }
                        ]}
                    >
                        <Input.TextArea
                            placeholder="Nhập nội dung câu hỏi"
                            rows={4}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Môn học"
                        name="subject"
                        rules={[
                            { required: true, message: "Vui lòng chọn môn học" }
                        ]}
                    >
                        <Select placeholder="Chọn môn học">
                            {subjects.map(s => (
                                <Select.Option key={s.id} value={s.id}>{s.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Khối kiến thức"
                        name="block"
                        rules={[
                            { required: true, message: "Vui lòng chọn khối kiến thức" }
                        ]}
                    >
                        <Select placeholder="Chọn khối kiến thức">
                            {blocks.map(b => (
                                <Select.Option key={b.id} value={b.id}>{b.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Độ khó"
                        name="difficulty"
                        rules={[
                            { required: true, message: "Vui lòng chọn độ khó" }
                        ]}
                    >
                        <Select placeholder="Chọn độ khó">
                            <Select.Option value="Dễ">Dễ</Select.Option>
                            <Select.Option value="Trung bình">Trung bình</Select.Option>
                            <Select.Option value="Khó">Khó</Select.Option>
                            <Select.Option value="Rất khó">Rất khó</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}