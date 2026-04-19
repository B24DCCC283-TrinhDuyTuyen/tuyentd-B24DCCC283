import React from 'react'
import { Input, Select } from 'antd'
import { useModel } from 'umi'


const WorkoutFilter = () => {
    const {
        keyword,
        setkeyword,
        typeFilter,
        setTypeFilter,
        statusFilter,
        setStatusFilter,
    } = useModel('quanlilichtapluyencanhan')
    return (
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <Input
                placeholder='Tìm kiếm...'
                value={keyword}
                onChange={(e) => setkeyword(e.target.value)}
            />
            <Select
                placeholder='Loại'
                allowClear
                value={typeFilter}
                onChange={setTypeFilter}
                style={{ width: 150 }}
                options={[
                    { label: 'Cardio', value: 'carido' },
                    { label: 'Gym', value: 'gym' },
                    { label: 'Run', value: 'run' },
                    { label: 'Khác', value: 'other' },
                ]}
            />
            <Select
                placeholder='Trạng thái'
                allowClear
                value={statusFilter}
                onChange={setStatusFilter}
                style={{ width: 150 }}
                options={[
                    { label: 'Pending', value: 'pending' },
                    { label: 'Done', value: 'done' },
                ]}
            />


        </div>
    )
}

export default WorkoutFilter