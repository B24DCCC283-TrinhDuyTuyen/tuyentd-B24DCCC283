//random number
import React, { useState } from 'react';
import { Card, Button } from 'antd';
import GameStats from './components/GameStats';
import GuessInput from './components/GuessInput';
import GameMessage from './components/GameMessage';
import GuessHistory from './components/History';
import GameGuide from './components/GameGuide';
import { generateRandomNumber } from '@/services/RandomNumber';

// số lượt đoán
const MAX_ATTEMPTS = 10;

const RandomNumber: React.FC = () => {
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
    };

    return (
        <Card title="Trò chơi: Đoán Số" style={{ maxWidth: 1000 }}>
            <div style={{ display: 'flex', gap: 24 }}>
                <div style={{ flex: 2 }}>
                    {/* hiển thị số liệu: lượt còn lại, lượt đã dùng */}
                    <GameStats attempts={attempts} maxAttempts={MAX_ATTEMPTS} />

                    {/* res */}
                    <div style={{ marginTop: 12 }}>
                        <GameMessage message={message} type={messageType} />
                    </div>

                    <div style={{ marginTop: 12 }}>
                        <GuessInput
                            value={guess}
                            onChange={setGuess}
                            onSubmit={handleGuess}
                            disabled={gameOver} // ẩn
                        />
                        <Button style={{ marginLeft: 8 }} onClick={resetGame}>
                            Chơi lại
                        </Button>
                    </div>

                    <div style={{ marginTop: 16 }}>
                        <h4>Lịch sử dự đoán:</h4>
                        <GuessHistory history={history} />
                    </div>
                </div>

                <div style={{ flex: 1 }}>
                    <GameGuide />
                </div>
            </div>
        </Card>
    );
};

export default RandomNumber;
