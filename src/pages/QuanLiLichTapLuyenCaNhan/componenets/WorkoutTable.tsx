import { Table, Button, Tag, Popconfirm } from 'antd'
import { useModel } from 'umi'
import type { ColumnsType } from 'antd/lib/table'
import { WorkoutItem } from '@/services/QuanLiLichTapLuyenCaNhan'

import React from 'react'

const WorkoutTable = () => {
    const {
        workOuts,
        setCurrent,
        setisEdit,
        removeWorkout,
        toggleStatus
    } = useModel('quanlilichtapluyencanhan')

    const columns: ColumnsType<WorkoutItem> = [
        { title: 'Tên', dataIndex: 'name' },
        { title: 'Loại', dataIndex: 'type' },
        { title: 'Thời gian', dataIndex: 'duration' },
        { title: 'Ngày', dataIndex: 'date' },
        {
            title: 'Trạng thái',
            render: (_, record) =>
                record.status === 'done' ? (<Tag color='green'>Thành công</Tag>) : (<Tag color='orange'>Chưa xong</Tag>)
        },
        {
            title: 'Hành động',
            render: (_, record) => (
                <>
                    <Button
                        type='link'
                        onClick={() => {
                            setCurrent(record)
                            setisEdit(true)
                        }}>Sửa</Button>

                    <Button
                        type='link'
                        onClick={() => toggleStatus(record.id)}
                    >Toggle</Button>

                    <Popconfirm
                        title='xóa?'
                        onConfirm={() => removeWorkout(record.id)}
                    >
                        <Button danger type='link'>Xóa</Button>
                    </Popconfirm>
                </>
            )
        }
    ]
    return (
        <Table rowKey='id' columns={columns} dataSource={workOuts} />
    )
}

export default WorkoutTable