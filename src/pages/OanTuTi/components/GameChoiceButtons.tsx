import { Choice } from "@/services/OanTuTi";
interface Props {
    onSelectChoice: (choice: Choice) => void;
}

export default function GameChoiceButtons({ onSelectChoice }: Props) {
    return (
        <div>
            <button onClick={() => onSelectChoice('rock')}>✊ Đấm </button>
            <button onClick={() => onSelectChoice('paper')}>✋ Bao</button>
            <button onClick={() => onSelectChoice('scissors')}>✌️ Giấy</button>
        </div>
    )
}