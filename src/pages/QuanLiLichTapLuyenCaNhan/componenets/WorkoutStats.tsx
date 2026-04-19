import { Card } from 'antd'
import { useModel } from 'umi'

import React from 'react'

const WorkoutStats = () => {
    const { total, done, pending, totalDuration } = useModel('quanlilichtapluyencanhan')
    return (
        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <Card title='Tổng'>{total}</Card>
            <Card title='Hoàn thành'>{done}</Card>
            <Card title='Chưa xong'>{pending}</Card>
            <Card title='Tổng phút'>{totalDuration}</Card>

        </div>
    )
}

export default WorkoutStats
