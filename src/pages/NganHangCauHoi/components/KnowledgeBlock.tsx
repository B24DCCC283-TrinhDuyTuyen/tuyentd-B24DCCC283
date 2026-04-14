import { Button, Table, Input, Form, Modal, Space, message, Spin, Empty } from "antd"
import { useState, useEffect } from "react"
import { useModel } from "umi"
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons"
import { KnowledgeBlock as IKnowledgeBlock } from "@/services/NganHangCauHoi/knowledgeBlock"

export default function KnowledgeBlock() {

    const { blocks, loading, fetchBlocks, createBlock, updateBlock, removeBlock } = useModel("NganHangCauHoi.knowledgeBlock")
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [editingBlock, setEditingBlock] = useState<IKnowledgeBlock | null>(null)
    const [form] = Form.useForm()
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        fetchBlocks()
    }, [])

    const handleOpenModal = (block?: IKnowledgeBlock) => {
        if (block) {
            setEditingBlock(block)
            form.setFieldsValue({
                name: block.name
            })
        } else {
            setEditingBlock(null)
            form.resetFields()
        }
        setIsModalVisible(true)
    }

    const handleCloseModal = () => {
        setIsModalVisible(false)
        form.resetFields()
        setEditingBlock(null)
    }

    const handleSubmit = async (values: any) => {
        try {
            if (editingBlock) {
                await updateBlock({
                    ...editingBlock,
                    ...values
                })
                message.success("Cập nhật khối kiến thức thành công")
            } else {
                await createBlock({
                    id: 'KB_' + Date.now(),
                    name: values.name
                })
                message.success("Thêm khối kiến thức thành công")
            }
            handleCloseModal()
        } catch (error) {
            message.error("Có lỗi xảy ra")
        }
    }

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: "Xoá khối kiến thức",
            content: "Bạn có chắc muốn xoá khối kiến thức này?",
            okText: "Xoá",
            cancelText: "Huỷ",
            onOk: async () => {
                try {
                    await removeBlock(id)
                    message.success("Xoá khối kiến thức thành công")
                } catch (error) {
                    message.error("Có lỗi xảy ra")
                }
            }
        })
    }

    const filteredBlocks = blocks.filter(b =>
        b.name.toLowerCase().includes(searchText.toLowerCase())
    )

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 100
        },
        {
            title: "Tên khối kiến thức",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Thao tác",
            key: "action",
            width: 120,
            align: "center" as const,
            render: (_: any, record: IKnowledgeBlock) => (
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
                <h2 style={{ margin: 0 }}>Quản lý khối kiến thức</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => handleOpenModal()}
                >
                    Thêm khối kiến thức
                </Button>
            </div>

            <Input.Search
                placeholder="Tìm kiếm khối kiến thức"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginBottom: 20, maxWidth: 300 }}
            />

            <Spin spinning={loading}>
                {filteredBlocks.length > 0 ? (
                    <Table
                        columns={columns}
                        dataSource={filteredBlocks}
                        rowKey="id"
                        pagination={{ pageSize: 10 }}
                        size="middle"
                    />
                ) : (
                    <Empty description="Không có dữ liệu" />
                )}
            </Spin>

            <Modal
                title={editingBlock ? "Cập nhật khối kiến thức" : "Thêm khối kiến thức"}
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
                        label="Tên khối kiến thức"
                        name="name"
                        rules={[
                            { required: true, message: "Vui lòng nhập tên khối kiến thức" }
                        ]}
                    >
                        <Input placeholder="VD: Tổng quan, Chuyên sâu" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}