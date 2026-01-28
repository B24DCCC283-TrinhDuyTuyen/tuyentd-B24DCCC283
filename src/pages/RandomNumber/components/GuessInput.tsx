//input nhập số
import React from 'react';
import { Space, InputNumber, Button } from 'antd';

interface Props {
    value: number | null;           // Giá trị input hiện tại
    onChange: (v: number | null) => void;  // Callback khi input thay đổi
    onSubmit: () => void;           // Callback khi bấm nút "Dự đoán"
    disabled?: boolean;             // Disable khi game kết thúc
}

const GuessInput: React.FC<Props> = ({ value, onChange, onSubmit, disabled }) => {
    return (
        <Space>
            <InputNumber min={1} max={100} value={value ?? undefined} onChange={(v) => onChange(v as number)} disabled={disabled} />
            <Button type="primary" onClick={onSubmit} disabled={disabled}>
                Dự đoán
            </Button>
        </Space>
    );
};

export default GuessInput;
