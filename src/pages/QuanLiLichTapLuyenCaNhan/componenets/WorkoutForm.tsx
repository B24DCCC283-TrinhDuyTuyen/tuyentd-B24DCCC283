import React from 'react'
import { useEffect } from 'react'
import { useModel } from 'umi'
import { Form, Input, Button, Select, DatePicker, InputNumber, message } from 'antd'
import dayjs from 'dayjs'

const { Option } = Select


const WorkoutForm = () => {
    const [form] = Form.useForm()
    const {
        isEdit,
        current,
        addWorkout,
        editWorkout
    } = useModel('quanlilichtapluyencanhan')

    const onFinish = (values: any) => {
        const payload = {
            name: values.name,
            type: values.type,
            duration: values.duration,
            date: values.date.format('YYYY-MM-DD'),
        }

        if (isEdit && current) {
            editWorkout(current.id, payload)
            message.success("Cập nhật thành công")
        } else {
            addWorkout(payload.name, payload.type, payload.duration, payload.date)
            message.success("Thêm thành công")
        }
        form.resetFields()
    }

    useEffect(() => {
        if (isEdit && current) {
            form.setFieldsValue({
                name: current.name,
                type: current.type,
                duration: current.duration,
                date: current.date ? dayjs(current.date) : null
            })
        } else {
            form.resetFields()
        }
    }, [isEdit, current])

    return (
        <Form form={form} layout='vertical' onFinish={onFinish}>
            <Form.Item
                name='name'
                label='Tên bài tập'
                rules={[{ required: true, message: 'Nhập tên bài tập' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item name='type' label='Loại'>
                <Select>
                    <Option value="cardio">Cardio</Option>
                    <Option value="gym">Gym</Option>
                    <Option value="run">Chạy bộ</Option>
                    <Option value="other">Khác</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name='duration'
                label='Thời gina (phut)'
                rules={[{ required: true, message: 'Nhập thời gian' }]}
            >
                <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name='date' label='Ngày'>
                <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Button type='primary' htmlType='submit' block>
                {isEdit ? 'Cập nhật' : 'Thêm'}
            </Button>
        </Form>
    )
}

export default WorkoutForm