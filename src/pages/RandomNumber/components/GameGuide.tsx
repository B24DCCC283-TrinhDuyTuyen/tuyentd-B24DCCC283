//hướng dẫn 
import React from 'react';
import { Card } from 'antd';

const GameGuide: React.FC = () => {
    return (
        <Card title="Hướng dẫn chơi" style={{ marginTop: 12 }}>
            <ol>
                <li>Hệ thống sẽ sinh ra một số ngẫu nhiên từ 1 đến 100</li>
                <li>Bạn có 10 lượt để đoán đúng số đó</li>
                <li>Sau mỗi lần dự đoán, hệ thống sẽ cho biết số bạn đoán cao hơn hay thấp hơn</li>
                <li>Nếu đoán đúng, bạn sẽ thắng!</li>
                <li>Nếu hết 10 lượt mà chưa đoán đúng, trò chơi kết thúc</li>
            </ol>
        </Card>
    );
};

export default GameGuide;
