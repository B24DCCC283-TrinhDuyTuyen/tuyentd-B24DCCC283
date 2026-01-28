//thông báo
import React from 'react';
import { Alert } from 'antd';

interface Props {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
}


const GameMessage: React.FC<Props> = ({ message, type }) => {
    if (!message) return null;
    return <Alert message={message} type={type} showIcon />;
};

export default GameMessage;
