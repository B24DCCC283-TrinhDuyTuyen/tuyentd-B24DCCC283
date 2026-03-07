import { useState } from "react";
import { generateRandomChoice, compareResult, Choice, Result } from "@/services/OanTuTi";

export default () => {

    // Current round
    const [currentPlayerChoice, setCurrentPlayerChoice] = useState<Choice | null>(null);
    const [currentComputerChoice, setCurrentComputerChoice] = useState<Choice | null>(null);
    const [currentGameResult, setCurrentGameResult] = useState<Result | null>(null);

    // History
    const [gameHistory, setGameHistory] = useState<
        { playerChoice: Choice; computerChoice: Choice; result: Result }[]
    >([]);

    // Score
    const [gameScore, setGameScore] = useState({
        win: 0,
        lose: 0,
        draw: 0
    });

    // Play game
    const playGame = (playerChoice: Choice) => {
        const computerChoice = generateRandomChoice();
        const gameResult = compareResult(playerChoice, computerChoice);

        setCurrentPlayerChoice(playerChoice);
        setCurrentComputerChoice(computerChoice);
        setCurrentGameResult(gameResult);

        // Update history
        setGameHistory((prevHistory) => [
            { playerChoice, computerChoice, result: gameResult },
            ...prevHistory
        ]);

        // Update score
        setGameScore((prevScore) => ({
            ...prevScore,
            [gameResult]: prevScore[gameResult] + 1
        }));
    };

    // Reset game
    const resetGame = () => {
        setCurrentPlayerChoice(null);
        setCurrentComputerChoice(null);
        setCurrentGameResult(null);
        setGameHistory([]);
        setGameScore({ win: 0, lose: 0, draw: 0 });
    };

    // ✅ RETURN PHẢI Ở ĐÂY
    return {
        currentPlayerChoice,
        currentComputerChoice,
        currentGameResult,
        gameHistory,
        gameScore,
        playGame,
        resetGame
    };
};