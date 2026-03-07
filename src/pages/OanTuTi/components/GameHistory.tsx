import { Choice, Result } from "@/services/OanTuTi";
import { translate } from "@/utils/oanTuTiTranslate";

interface HistoryItem {
    playerChoice: Choice;
    computerChoice: Choice;
    result: Result;
}

interface Props {
    history: HistoryItem[];
}

export default function GameHistory({ history }: Props) {
    return (
        <div>
            <h3>Lịch sử</h3>
            <ul>
                {history.map((item, index) => (
                    <li key={index}>
                        Người chơi: {translate.choice[item.playerChoice]} |
                        Máy: {translate.choice[item.computerChoice]} →
                        {translate.result[item.result]}
                    </li>
                ))}
            </ul>
        </div>
    );
}