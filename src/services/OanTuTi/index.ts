export type Choice = 'rock' | 'paper' | 'scissors';
export type Result = 'win' | 'lose' | 'draw';

const choices: Choice[] = ['rock', 'paper', 'scissors'];


//Hàm sinh lựa chọn của máy
export const generateRandomChoice = (): Choice => {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

//Hàm so sánh kết quả
export const compareResult = (player: Choice, computer: Choice): Result => {
    if (player === computer) return 'draw';

    const winCases: Record<Choice, Choice> = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper',
    };
    return winCases[player] === computer ? 'win' : 'lose';
};
