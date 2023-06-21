import Character from "./Character";
import Vector2 from "./Vector2";
import { shuffleArray } from "./Utils";
import { IGameContext } from "../context/GameContext";
import type { IGridManagerPublicData } from "../components/GridManager"


class Ai extends Character {
    private _actionTimeout: number;
    constructor(gameContext: IGameContext, gridManager: IGridManagerPublicData) {
        super(gameContext, gridManager);
        this._actionTimeout = 0;
    }

    action(): void {
        this._actionTimeout = setTimeout(this.easyAction, 500, []);

    }

    easyAction = () => {
        const matrix = this.gridManager.matrix;
        let possibleMoves: Vector2[] = [];

        for (let r = 0; r < matrix.rows; r++) {
            for (let c = 0; c < matrix.cols; c++) {
                if (matrix.data[r][c].length === 0) {
                    possibleMoves.push(new Vector2(c, r));
                }
            }
        }
        if (possibleMoves.length === 0) return;
        shuffleArray(possibleMoves);
        let move = possibleMoves[0];
        this.gridManager.setMatrixValue(move.y, move.x, this.symbol);
        this.gridManager.nextCharacterAction();
    }

    destructor(): void {
        clearTimeout(this._actionTimeout);
    }
}


export default Ai;