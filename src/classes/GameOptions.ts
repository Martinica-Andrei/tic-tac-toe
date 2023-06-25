import { AiDifficulty } from "./Constants";

class GameOptions {
    aiDifficulty: number;
    playerSymbol: string;
    constructor() {
        this.aiDifficulty = AiDifficulty.NO_DIFFICULTY;
        this.playerSymbol = 'X';
    }

}

export default GameOptions;