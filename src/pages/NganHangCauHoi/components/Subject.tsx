import { Button, Table, Input, Form, Modal, Space, message, Spin, Empty } from "antd"
import { useState, useEffect } from "react"
import { useModel } from "umi"
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons"
import { Subject as ISubject } from "@/services/NganHangCauHoi/subject"

export default function Subject() {

    const { subjects, loading, fetchSubjects, createSubject, updateSubjectData, removeSubject } = useModel("NganHangCauHoi.subject")
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [editingSubject, setEditingSubject] = useState<ISubject | null>(null)
    const [form] = Form.useForm()
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        fetchSubjects()
    }, [])

    const handleOpenModal = (subject?: ISubject) => {
        if (subject) {
            setEditingSubject(subject)
            form.setFieldsValue({
                code: subject.code,
                name: subject.name,
                credits: subject.credits
            })
        } else {
            setEditingSubject(null)
            form.resetFields()
        }
        setIsModalVisible(true)
    }

    const handleCloseModal = () => {
        setIsModalVisible(false)
        form.resetFields()
        setEditingSubject(null)
    }

    const handleSubmit = async (values: any) => {
        try {
            if (editingSubject) {
                await updateSubjectData({
                    ...editingSubject,
                    ...values
                })
                message.success("Cập nhật môn học thành công")
            } else {
                await createSubject({
                    id: 'Subject_' + Date.now(),
                    code: values.code,
                    name: values.name,
                    credits: values.credits
                })
                message.success("Thêm môn học thành công")
            }
            handleCloseModal()
        } catch (error) {
            message.error("Có lỗi xảy ra")
        }
    }

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: "Xoá môn học",
            content: "Bạn có chắc muốn xoá môn học này?",
            okText: "Xoá",
            cancelText: "Huỷ",
            onOk: async () => {
                try {
                    await removeSubject(id)
                    message.success("Xoá môn học thành công")
                } catch (error) {
                    message.error("Có lỗi xảy ra")
                }
            }
        })
    }

    const filteredSubjects = subjects.filter(s =>
        s.code.toLowerCase().includes(searchText.toLowerCase()) ||
        s.name.toLowerCase().includes(searchText.toLowerCase())
    )

    const columns = [
        {
            title: "Mã môn",
            dataIndex: "code",
            key: "code",
            width: 120
        },
        {
            title: "Tên môn học",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Số tín chỉ",
            dataIndex: "credits",
            key: "credits",
            width: 100,
            align: "center" as const
        },
        {
            title: "Thao tác",
            key: "action",
            width: 120,
            align: "center" as const,
            render: (_: any, record: ISubject) => (
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
                <h2 style={{ margin: 0 }}>Quản lý môn học</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => handleOpenModal()}
                >
                    Thêm môn học
                </Button>
            </div>

            <Input.Search
                placeholder="Tìm kiếm theo mã hoặc tên môn học"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginBottom: 20, maxWidth: 300 }}
            />

            <Spin spinning={loading}>
                {filteredSubjects.length > 0 ? (
                    <Table
                        columns={columns}
                        dataSource={filteredSubjects}
                        rowKey="id"
                        pagination={{ pageSize: 10 }}
                        size="middle"
                    />
                ) : (
                    <Empty description="Không có dữ liệu" />
                )}
            </Spin>

            <Modal
                title={editingSubject ? "Cập nhật môn học" : "Thêm môn học"}
                visible={isModalVisible}
                onOk={() => form.submit()}
                onCancel={handleCloseModal}
                okText="Lưu"
                cancelText="Huỷ"
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Mã môn"
                        name="code"
                        rules={[
                            { required: true, message: "Vui lòng nhập mã môn" },
                            { min: 1, max: 20, message: "Mã môn từ 1-20 ký tự" }
                        ]}
                    >
                        <Input placeholder="VD: WEB101" />
                    </Form.Item>

                    <Form.Item
                        label="Tên môn học"
                        name="name"
                        rules={[
                            { required: true, message: "Vui lòng nhập tên môn học" }
                        ]}
                    >
                        <Input placeholder="VD: Lập trình Web" />
                    </Form.Item>

                    <Form.Item
                        label="Số tín chỉ"
                        name="credits"
                        rules={[
                            { required: true, message: "Vui lòng nhập số tín chỉ" }
                        ]}
                    >
                        <Input type="number" min={1} max={10} placeholder="VD: 3" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}