import { useModel } from "umi";
import GameChoiceButtons from "./components/GameChoicebutton/GameChoiceButtons";
import GameHistory from "./components/GameHistory/GameHistory";
import GameResultDisplay from "./components/GameResultDisplay/GameResultDisplay";

export default function Page() {
    const {
        currentPlayerChoice,
        currentComputerChoice,
        currentGameResult,
        gameHistory,
        gameScore,
        playGame,
        resetGame,
    } = useModel('oanTuTi');

    return (
        <div>
            <h2>🎮 Trò chơi Oẳn Tù Tì</h2>

            <GameChoiceButtons onSelectChoice={playGame} />

            <GameResultDisplay
                playerChoice={currentPlayerChoice}
                computerChoice={currentComputerChoice}
                result={currentGameResult}
            />

            <h3>
                Thắng: {gameScore.win} |
                Thua: {gameScore.lose} |
                Hòa: {gameScore.draw}
            </h3>

            <GameHistory history={gameHistory} />

            <button onClick={resetGame}>Chơi lại</button>
        </div>
    );
}