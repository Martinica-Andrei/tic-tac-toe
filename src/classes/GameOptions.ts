import { AiDifficulty } from "./Constants";

class GameOptions {
    aiDifficulty: number;
    constructor() {
        this.aiDifficulty = AiDifficulty.NO_DIFFICULTY;
    }

}

export default GameOptions;