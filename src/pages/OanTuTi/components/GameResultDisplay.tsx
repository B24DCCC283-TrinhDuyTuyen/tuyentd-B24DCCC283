import type { Choice, Result } from "@/services/OanTuTi";
import { translate } from "@/utils/oanTuTiTranslate";
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
        <div>
            <p>Lựa chọn của bạn: {translate.choice[playerChoice]}</p>
            <p>Lựa chọn của máy: {translate.choice[computerChoice]}</p>
            {result !== null && (
                <h3>Kết quả: {translate.result[result]}</h3>
            )}
        </div>
    )
}