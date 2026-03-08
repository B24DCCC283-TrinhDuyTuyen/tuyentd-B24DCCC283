import type { Choice, Result } from "@/services/OanTuTi";
import { translate } from "@/utils/oanTuTiTranslate";
import styles from './GameResultDisplay.module.css'

interface Props {
    playerChoice: Choice | null;
    computerChoice: Choice | null;
    result: Result | null;
}

export default function GameResultDisplay({
    playerChoice, computerChoice, result
}: Props) {
    if (!playerChoice || !computerChoice) return null;

    return (
        <div className={styles.container}>
            <p className={styles.choice}>Lựa chọn của bạn: {translate.choice[playerChoice]}</p>
            <p className={styles.choice}>Lựa chọn của máy: {translate.choice[computerChoice]}</p>
            {result !== null && (
                <h3 className={styles.result}>Kết quả: {translate.result[result]}</h3>
            )}
        </div>
    )
}