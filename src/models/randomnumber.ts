import { useState } from 'react';
import { generateRandomNumber } from '@/services/RandomNumber';

// số lượt đoán
const MAX_ATTEMPTS = 10;

export default () => {
    // ssinh số ngẫu nhiên
    const [secret, setSecret] = useState<number>(generateRandomNumber());

    // số mà người dùng nhập vào
    const [guess, setGuess] = useState<number | null>(null);

    // số lần người dùng đã đoán
    const [attempts, setAttempts] = useState<number>(0);

    //res (vd: "Quá cao", "Quá thấp", "Đoán đúng")
    const [message, setMessage] = useState<string>('');

    // loại thông báo: 'success' (đúng), 'error' (sai/hết lượt), 'warning' (gợi ý), 'info' (thông tin)
    const [messageType, setMessageType] = useState<'success' | 'error' | 'info' | 'warning'>('info');

    // xem game có kết thúc hay không
    const [gameOver, setGameOver] = useState<boolean>(false);

    // mảng lưu lịch sử tất cả các số đã đoán
    const [history, setHistory] = useState<number[]>([]);

    //hàm reset lại
    const resetGame = () => {
        setSecret(generateRandomNumber());
        setGuess(null);
        setAttempts(0);
        setMessage('');
        setMessageType('info');
        setGameOver(false);
        setHistory([]);
    };
    //xử lí khi người dùng dự đoán
    const handleGuess = () => {
        // nếu game đã kết thúc, không xử lý thêm
        if (gameOver) return;

        // kiểm tra số nhập vào có hợp lệ không
        if (guess === null || isNaN(guess)) {
            setMessage('Vui lòng nhập một số hợp lệ!');
            setMessageType('error');
            return;
        }

        // kiểm tra số có nằm trong khoảng 1-100 không
        if (guess < 1 || guess > 100) {
            setMessage('Vui lòng nhập số trong khoảng từ 1 đến 100!');
            setMessageType('error');
            return;
        }

        // tăng số lượt đoán, max 10
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        // thêm số vừa đoán vào lịch sử
        setHistory((h) => [...h, guess]);

        // kiểm tra đoán đúng
        if (guess === secret) {
            setMessage('Chúc mừng! Bạn đã đoán đúng!');
            setMessageType('success');
            setGameOver(true);
            return;
        }

        // Gợi ý: quá thấp hay quá cao
        if (guess < secret) {
            setMessage('Bạn đoán quá thấp!');
            setMessageType('warning');
        } else {
            setMessage('Bạn đoán quá cao!');
            setMessageType('warning');
        }

        // kiểm tả hết lượt đoán hay chưa
        if (newAttempts >= MAX_ATTEMPTS) {
            setMessage(`Bạn đã hết lượt! Số đúng là ${secret}.`);
            setMessageType('error');
            setGameOver(true);
        }
        setGuess(null);
    }

    return {
        // state
        guess,
        attempts,
        message,
        messageType,
        gameOver,
        history,
        MAX_ATTEMPTS,

        // actions
        setGuess,
        handleGuess,
        resetGame,
    };
};
