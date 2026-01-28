//kichj suwj
import React from 'react';

interface Props {
    history: number[];  // Mảng các số đã dự đoán
}
const GuessHistory: React.FC<Props> = ({ history }) => {
    // Nếu chưa có dự đoán, hiển thị thông báo
    if (!history || history.length === 0) return <div>Chưa có dự đoán nào.</div>;

    return (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {history.map((h, i) => (
                <div key={i} style={{ padding: '6px 12px', background: '#f6f6f6', borderRadius: 16 }}>
                    {h}
                </div>
            ))}
        </div>
    );
};

export default GuessHistory;
