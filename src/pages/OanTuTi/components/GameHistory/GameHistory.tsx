import { Choice, Result } from "@/services/OanTuTi";
import { translate } from "@/utils/oanTuTiTranslate";
import styles from './GameHistory.module.css'

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
        <div className={styles.container}>
            <h3 className={styles.title}>Lịch sử</h3>
            <ul className={styles.list}>
                {history.map((item, index) => (
                    <li key={index} className={styles.item}>
                        Người chơi: {translate.choice[item.playerChoice]} |
                        Máy: {translate.choice[item.computerChoice]} →
                        {translate.result[item.result]}
                    </li>
                ))}
            </ul>
        </div>
    );
}