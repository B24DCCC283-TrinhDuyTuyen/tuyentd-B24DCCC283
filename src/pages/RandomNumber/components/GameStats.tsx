//thống kê trò chơi
import React from 'react';
import { Row, Col, Statistic, Progress } from 'antd';

interface Props {
    attempts: number;      // Số lượt đã dùng
    maxAttempts: number;   // Tổng số lượt tối đa (10)
}

const GameStats: React.FC<Props> = ({ attempts, maxAttempts }) => {
    // Tính số lượt còn lại
    const remaining = maxAttempts - attempts;
    return (
        <div>
            <Row gutter={16} style={{ marginBottom: 12 }}>
                <Col span={8}>
                    <Statistic title="Tổng lượt" value={maxAttempts} />
                </Col>
                <Col span={8}>
                    <Statistic title="Lượt đã dùng" value={attempts} />
                </Col>
                <Col span={8}>
                    <Statistic title="Lượt còn lại" value={remaining} />
                </Col>


            </Row>
            <Progress percent={(attempts / maxAttempts) * 100} /> {/*thanh % */}
        </div>
    );
};

export default GameStats;
