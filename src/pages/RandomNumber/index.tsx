import React from 'react';
import { Card, Button } from 'antd';
import { useModel } from 'umi';

import GameStats from './components/GameStats';
import GuessInput from './components/GuessInput';
import GameMessage from './components/GameMessage';
import GuessHistory from './components/History';
import GameGuide from './components/GameGuide';

const RandomNumber: React.FC = () => {
    const {
        guess,
        attempts,
        message,
        messageType,
        gameOver,
        history,
        MAX_ATTEMPTS,
        setGuess,
        handleGuess,
        resetGame,
    } = useModel('randomnumber');

    return (
        <Card title="Trò chơi: Đoán Số" style={{ maxWidth: 1000 }}>
            <div style={{ display: 'flex', gap: 24 }}>
                <div style={{ flex: 2 }}>
                    <GameStats attempts={attempts} maxAttempts={MAX_ATTEMPTS} />

                    <div style={{ marginTop: 12 }}>
                        <GameMessage message={message} type={messageType} />
                    </div>

                    <div style={{ marginTop: 12 }}>
                        <GuessInput
                            value={guess}
                            onChange={setGuess}
                            onSubmit={handleGuess}
                            disabled={gameOver}
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
