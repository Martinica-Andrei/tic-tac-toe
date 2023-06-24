import Character from "./Character";
import Vector2 from "./Vector2";
import { shuffleArray } from "./Utils";
import type { IGameContext } from "../context/GameContext";
import type { IGridManagerPublicData } from "../components/GridManager"
import { AiDifficulty } from "./Constants";

class Ai extends Character {
    private _actionTimeout: number;
    private _difficulty : number;
    private _actionBasedOnDifficulty : () => void;
    constructor(gameContext: IGameContext, gridManager: IGridManagerPublicData) {
        super(gameContext, gridManager);
        this._difficulty = AiDifficulty.EASY;
        this._actionBasedOnDifficulty = this._easyAction;
        this._actionTimeout = 0;
    }

    action(): void {
        console.log('waht');
        this._actionTimeout = setTimeout(this._actionBasedOnDifficulty, 500, []);

    }

    private _easyAction = () => {
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

    private _mediumAction = () =>{

    }

    private _hardAction = () =>{

    }

    destructor(): void {
        clearTimeout(this._actionTimeout);
    }

    difficulty = () =>{
        return this._difficulty;
    }

    setDifficulty = (difficulty : number) =>{
        this._difficulty = difficulty;
        if(difficulty === AiDifficulty.EASY){
            this._actionBasedOnDifficulty = this._easyAction;
        }
        else if(difficulty === AiDifficulty.MEDIUM){
            this._actionBasedOnDifficulty = this._mediumAction;
        }
        else if(difficulty === AiDifficulty.HARD){
            this._actionBasedOnDifficulty = this._hardAction;
        }
        else{
            console.log(`!!! INVALID DIFFICULTY ${difficulty} !!!`);
        }
    }
}


export default Ai;