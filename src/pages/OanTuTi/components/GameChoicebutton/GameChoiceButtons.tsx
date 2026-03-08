import { Choice } from "@/services/OanTuTi";
import styles from './GameChoiceButtons.module.css'
interface Props {
    onSelectChoice: (choice: Choice) => void;
}

export default function GameChoiceButtons({ onSelectChoice }: Props) {
    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={() => onSelectChoice('rock')}>✊ Đấm </button>
            <button className={styles.button} onClick={() => onSelectChoice('paper')}>✋ Bao</button>
            <button className={styles.button} onClick={() => onSelectChoice('scissors')}>✌️ Giấy</button>
        </div>
    )
}