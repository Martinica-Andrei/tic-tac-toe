import Character from "./Character";
import Vector2 from "./Vector2";
import { doesMatrixHaveValue, getRandomInt, shuffleArray } from "./Utils";
import type { IGameContext } from "../context/GameContext";
import { isGameOver, type IGridManagerPublicData, type IMatrix } from "../components/GridManager"
import { AiDifficulty } from "./Constants";

class Ai extends Character {
    private _actionTimeout: number;
    private _difficulty: number;
    private _actionBasedOnDifficulty: () => void;
    constructor(gameContext: IGameContext, gridManager: IGridManagerPublicData) {
        super(gameContext, gridManager);
        this._difficulty = AiDifficulty.EASY;
        this._actionBasedOnDifficulty = this._easyAction;
        this._actionTimeout = 0;
    }

    action(): void {
        this._actionTimeout = setTimeout(this._actionBasedOnDifficulty, 0, []);

    }

    private _getPossibleMoves(matrix: IMatrix) {
        let possibleMoves: Vector2[] = [];

        for (let r = 0; r < this.gridManager.matrix.rows; r++) {
            for (let c = 0; c < matrix.cols; c++) {
                if (matrix.data[r][c].length === 0) {
                    possibleMoves.push(new Vector2(c, r));
                }
            }
        }
        return possibleMoves;
    }

    private _isWinningMove(possibleMoves: Vector2[], symbol: string) {
        const matrix = this.gridManager.matrix;
        for (const move of possibleMoves) {
            matrix.data[move.y][move.x] = symbol;
            const isGameOverValue = isGameOver(matrix);
            matrix.data[move.y][move.x] = '';
            if (isGameOverValue) {
                return move;
            }
        }
        return null;
    }

    private _isFirstMove() {
        let count = 0;
        for (const row of this.gridManager.matrix.data) {
            for (const cell of row) {
                if (cell === '') {
                    count++;
                }
            }
        }
        return (count === this.gridManager.matrix.rows * this.gridManager.matrix.cols);
    }

    private _easyAction = () => {
        const possibleMoves: Vector2[] = this._getPossibleMoves(this.gridManager.matrix);
        if (possibleMoves.length === 0) return;
        shuffleArray(possibleMoves);
        let move = possibleMoves[0];
        this.gridManager.setMatrixValue(move.y, move.x, this.symbol);
        this.gridManager.nextCharacterAction();
    }

    private _mediumAction = () => {
        const possibleMoves: Vector2[] = this._getPossibleMoves(this.gridManager.matrix);
        if (possibleMoves.length === 0) return;
        const winningMove = this._isWinningMove(possibleMoves, this.symbol);
        if (winningMove) {
            this.gridManager.setMatrixValue(winningMove.y, winningMove.x, this.symbol);
            this.gridManager.nextCharacterAction();
            return;
        }
        const opponentWinningMove = this._isWinningMove(possibleMoves, this.opponent.symbol);
        if (opponentWinningMove) {
            this.gridManager.setMatrixValue(opponentWinningMove.y, opponentWinningMove.x, this.symbol);
            this.gridManager.nextCharacterAction();
            return;
        }
        shuffleArray(possibleMoves);
        let move = possibleMoves[0];
        this.gridManager.setMatrixValue(move.y, move.x, this.symbol);
        this.gridManager.nextCharacterAction();
    }

    private _getLossesAndTies(matrix: IMatrix, isOpponentMove: boolean) : Vector2 {
        let lossesAndTies = new Vector2(0,0);
        const isGameOverValue = isGameOver(matrix);
        if (isGameOverValue) {
            if(isGameOverValue === this.opponent.symbol){
                lossesAndTies.x++;
            }
            else if(isGameOverValue === 'tie'){
                lossesAndTies.y++;
            }
            return lossesAndTies;
        }
        const possibleMoves = this._getPossibleMoves(matrix);
        const symbol = isOpponentMove ? this.opponent.symbol : this.symbol;
        for (const move of possibleMoves) {
            matrix.data[move.y][move.x] = symbol;
            const moveLossesAndTies = this._getLossesAndTies(matrix, !isOpponentMove);
            lossesAndTies.x += moveLossesAndTies.x;
            lossesAndTies.y += moveLossesAndTies.y;
            matrix.data[move.y][move.x] = '';
        }
        return lossesAndTies;
    }

    private _hardAction = () => {
        if(this._isFirstMove()){
            this._easyAction();
            return;
        }
        const possibleMoves = this._getPossibleMoves(this.gridManager.matrix);
        if(possibleMoves.length === 0) return;
        let matrix = this.gridManager.matrix;
        let lossesAndTies = [];
        for (const move of possibleMoves) {
            matrix.data[move.y][move.x] = this.symbol;
            lossesAndTies.push(this._getLossesAndTies(matrix, true));
            matrix.data[move.y][move.x] = '';
        }
        let movesWithLossesAndTies = [];
        for (let i = 0; i < possibleMoves.length; i++) {
            movesWithLossesAndTies.push({score : lossesAndTies[i], move : possibleMoves[i]});
        }
        movesWithLossesAndTies.sort((a, b) => {
            if(a.score.x === b.score.x){
                return a.score.y - b.score.y;
            }
            return a.score.x - b.score.x;
        });
        let lengthSameLosses = 1;
        for(; lengthSameLosses < movesWithLossesAndTies.length; lengthSameLosses++){
            if(movesWithLossesAndTies[lengthSameLosses] !== movesWithLossesAndTies[lengthSameLosses - 1]) break;
        }
        let move = movesWithLossesAndTies[getRandomInt(0, lengthSameLosses)].move;
        console.log(movesWithLossesAndTies);
        this.gridManager.setMatrixValue(move.y, move.x, this.symbol);
        this.gridManager.nextCharacterAction();
    }

    destructor(): void {
        clearTimeout(this._actionTimeout);
    }

    difficulty = () => {
        return this._difficulty;
    }

    setDifficulty = (difficulty: number) => {
        this._difficulty = difficulty;
        if (difficulty === AiDifficulty.EASY) {
            this._actionBasedOnDifficulty = this._easyAction;
        }
        else if (difficulty === AiDifficulty.MEDIUM) {
            this._actionBasedOnDifficulty = this._mediumAction;
        }
        else if (difficulty === AiDifficulty.HARD) {
            this._actionBasedOnDifficulty = this._hardAction;
        }
        else {
            console.log(`!!! INVALID DIFFICULTY ${difficulty} !!!`);
        }
    }
}


export default Ai;