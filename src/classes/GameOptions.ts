import { AiDifficulty } from "./Constants";

class GameOptions {
    aiDifficulty: number;
    playerSymbol: string;
    symbolAnimationToggle : boolean
    constructor() {
        this.aiDifficulty = AiDifficulty.NO_DIFFICULTY;
        this.playerSymbol = 'X';
        this.symbolAnimationToggle = true;
    }

}

export default GameOptions;