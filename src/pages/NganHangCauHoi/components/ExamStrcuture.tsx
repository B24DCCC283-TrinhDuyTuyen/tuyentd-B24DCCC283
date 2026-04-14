import { Button, Table, Form, Modal, Space, message, Spin, Empty, Select, Card, Row, Col, Input } from "antd"
import { useState, useEffect } from "react"
import { useModel } from "umi"
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons"
import { ExamStructure as IExamStructure, ExamRule } from "@/services/NganHangCauHoi/examStructure"

export default function ExamStructure() {

    const { structures, loading, fetchStructures, createStructure, updateStructure, removeStructure } = useModel("NganHangCauHoi.examStructure")
    const { subjects } = useModel("NganHangCauHoi.subject")
    const { blocks } = useModel("NganHangCauHoi.knowledgeBlock")

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [editingStructure, setEditingStructure] = useState<IExamStructure | null>(null)
    const [form] = Form.useForm()
    const [searchText, setSearchText] = useState("")
    const [rules, setRules] = useState<ExamRule[]>([])
    const [selectedSubject, setSelectedSubject] = useState<string>("")

    useEffect(() => {
        fetchStructures()
    }, [])

    const handleOpenModal = (structure?: IExamStructure) => {
        if (structure) {
            setEditingStructure(structure)
            setSelectedSubject(structure.subject)
            setRules(structure.rules)
            form.setFieldsValue({
                name: structure.name,
                description: structure.description
            })
        } else {
            setEditingStructure(null)
            setSelectedSubject("")
            setRules([])
            form.resetFields()
        }
        setIsModalVisible(true)
    }

    const handleCloseModal = () => {
        setIsModalVisible(false)
        form.resetFields()
        setEditingStructure(null)
        setSelectedSubject("")
        setRules([])
    }

    const handleAddRule = () => {
        setRules([...rules, {
            id: 'rule_' + Date.now(),
            difficulty: "Dễ",
            block: "",
            count: 1
        }])
    }

    const handleRemoveRule = (id: string) => {
        setRules(rules.filter(r => r.id !== id))
    }

    const handleRuleChange = (id: string, field: string, value: any) => {
        setRules(rules.map(r => r.id === id ? { ...r, [field]: value } : r))
    }

    const handleSubmit = async (values: any) => {
        if (!selectedSubject) {
            message.error("Vui lòng chọn môn học")
            return
        }

        if (rules.length === 0) {
            message.error("Vui lòng thêm ít nhất một quy tắc")
            return
        }

        // Validate rules
        const invalidRules = rules.filter(r => !r.block || r.count <= 0)
        if (invalidRules.length > 0) {
            message.error("Vui lòng điền đầy đủ thông tin cho tất cả các quy tắc")
            return
        }

        try {
            if (editingStructure) {
                await updateStructure({
                    ...editingStructure,
                    ...values,
                    subject: selectedSubject,
                    rules
                })
                message.success("Cập nhật cấu trúc đề thành công")
            } else {
                await createStructure({
                    id: 'Structure_' + Date.now(),
                    ...values,
                    subject: selectedSubject,
                    rules,
                    totalQuestions: 0
                })
                message.success("Thêm cấu trúc đề thành công")
            }
            handleCloseModal()
        } catch (error) {
            message.error("Có lỗi xảy ra")
        }
    }

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: "Xoá cấu trúc đề",
            content: "Bạn có chắc muốn xoá cấu trúc đề này?",
            okText: "Xoá",
            cancelText: "Huỷ",
            onOk: async () => {
                try {
                    await removeStructure(id)
                    message.success("Xoá cấu trúc đề thành công")
                } catch (error) {
                    message.error("Có lỗi xảy ra")
                }
            }
        })
    }

    const filteredStructures = structures.filter(s =>
        s.name.toLowerCase().includes(searchText.toLowerCase())
    )

    const getSubjectName = (id: string) => subjects.find(s => s.id === id)?.name || id

    const columns = [
        {
            title: "Tên cấu trúc",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Môn học",
            dataIndex: "subject",
            key: "subject",
            width: 150,
            render: (id: string) => getSubjectName(id)
        },
        {
            title: "Tổng câu hỏi",
            dataIndex: "totalQuestions",
            key: "totalQuestions",
            width: 120,
            align: "center" as const
        },
        {
            title: "Thao tác",
            key: "action",
            width: 120,
            align: "center" as const,
            render: (_: any, record: IExamStructure) => (
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
                <h2 style={{ margin: 0 }}>Quản lý cấu trúc đề thi</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => handleOpenModal()}
                >
                    Tạo cấu trúc đề
                </Button>
            </div>
            <div style={{ marginBottom: 16 }}>
                <Input.Search
                    placeholder="Tìm kiếm cấu trúc"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    allowClear
                    style={{ width: 300 }}
                />
            </div>

            <Spin spinning={loading}>
                {filteredStructures.length > 0 ? (
                    <Table
                        columns={columns}
                        dataSource={filteredStructures}
                        rowKey="id"
                        pagination={{ pageSize: 10 }}
                        size="middle"
                    />
                ) : (
                    <Empty description="Không có dữ liệu" />
                )}
            </Spin>

            <Modal
                title={editingStructure ? "Cập nhật cấu trúc đề" : "Tạo cấu trúc đề thi"}
                visible={isModalVisible}
                onOk={() => form.submit()}
                onCancel={handleCloseModal}
                okText="Lưu"
                cancelText="Huỷ"
                width={900}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Tên cấu trúc đề"
                        name="name"
                        rules={[
                            { required: true, message: "Vui lòng nhập tên cấu trúc đề" }
                        ]}
                    >
                        <Input placeholder="VD: Cấu trúc đề thi giữa kỳ" />
                    </Form.Item>

                    <Form.Item label="Môn học">
                        <Select
                            placeholder="Chọn môn học"
                            value={selectedSubject || undefined}
                            onChange={setSelectedSubject}
                        >
                            {subjects.map(s => (
                                <Select.Option key={s.id} value={s.id}>{s.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Mô tả"
                        name="description"
                    >
                        <Input placeholder="Mô tả cấu trúc đề (tuỳ chọn)" />
                    </Form.Item>

                    <div style={{ marginTop: 20, marginBottom: 20 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                            <h4>Quy tắc cấu trúc:</h4>
                            <Button type="dashed" size="small" onClick={handleAddRule}>
                                Thêm quy tắc
                            </Button>
                        </div>

                        {rules.length > 0 ? (
                            <div style={{ border: "1px solid #f0f0f0", borderRadius: 4, padding: 10 }}>
                                {rules.map((rule, index) => (
                                    <Card key={rule.id} size="small" style={{ marginBottom: 10 }}>
                                        <Row gutter={16}>
                                            <Col xs={24} sm={6}>
                                                <div style={{ fontSize: 12, color: "#666", marginBottom: 5 }}>Độ khó</div>
                                                <Select
                                                    value={rule.difficulty}
                                                    onChange={(val) => handleRuleChange(rule.id, "difficulty", val)}
                                                    style={{ width: "100%" }}
                                                >
                                                    <Select.Option value="Dễ">Dễ</Select.Option>
                                                    <Select.Option value="Trung bình">Trung bình</Select.Option>
                                                    <Select.Option value="Khó">Khó</Select.Option>
                                                    <Select.Option value="Rất khó">Rất khó</Select.Option>
                                                </Select>
                                            </Col>
                                            <Col xs={24} sm={8}>
                                                <div style={{ fontSize: 12, color: "#666", marginBottom: 5 }}>Khối kiến thức</div>
                                                <Select
                                                    placeholder="Chọn khối"
                                                    value={rule.block || undefined}
                                                    onChange={(val) => handleRuleChange(rule.id, "block", val)}
                                                    style={{ width: "100%" }}
                                                >
                                                    {blocks.map(b => (
                                                        <Select.Option key={b.id} value={b.id}>{b.name}</Select.Option>
                                                    ))}
                                                </Select>
                                            </Col>
                                            <Col xs={24} sm={6}>
                                                <div style={{ fontSize: 12, color: "#666", marginBottom: 5 }}>Số câu</div>
                                                <Input
                                                    type="number"
                                                    min={1}
                                                    value={rule.count}
                                                    onChange={(e) => handleRuleChange(rule.id, "count", Number(e.target.value))}
                                                    style={{ width: "100%" }}
                                                />
                                            </Col>
                                            <Col xs={24} sm={4} style={{ display: "flex", alignItems: "flex-end" }}>
                                                <Button
                                                    danger
                                                    size="small"
                                                    onClick={() => handleRemoveRule(rule.id)}
                                                    style={{ width: "100%" }}
                                                >
                                                    Xoá
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Empty description="Chưa có quy tắc nào" style={{ margin: "20px 0" }} />
                        )}
                    </div>
                </Form>
            </Modal>
        </div>
    )
}
