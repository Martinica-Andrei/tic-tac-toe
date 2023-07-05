import { AiDifficulty } from "./Constants";

class GameOptions {
    aiDifficulty: number;
    playerSymbol: string;
    symbolAnimationToggle : boolean;
    menuAnimationToggle : boolean;
    constructor() {
        this.aiDifficulty = AiDifficulty.NO_DIFFICULTY;
        this.playerSymbol = 'X';
        this.symbolAnimationToggle = true;
        this.menuAnimationToggle = true;
    }

}

export default GameOptions;