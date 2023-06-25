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

    private _getLosses(matrix: IMatrix, isOpponentMove: boolean) {
        if (doesMatrixHaveValue(matrix.data, '') === false) {
            return 0;
        }
        const isGameOverValue = isGameOver(matrix);
        if (isGameOverValue) {
            return Number(isGameOverValue === this.opponent.symbol);
        }
        const possibleMoves = this._getPossibleMoves(matrix);
        const symbol = isOpponentMove ? this.opponent.symbol : this.symbol;
        let losses = 0;
        for (const move of possibleMoves) {
            matrix.data[move.y][move.x] = symbol;
            losses += this._getLosses(matrix, !isOpponentMove);
            matrix.data[move.y][move.x] = '';
        }
        return losses;
    }

    private _hardAction = () => {
        if(this._isFirstMove()){
            this._easyAction();
            return;
        }
        const possibleMoves = this._getPossibleMoves(this.gridManager.matrix);
        if(possibleMoves.length === 0) return;
        let matrix = this.gridManager.matrix;
        let losses = [];
        for (const move of possibleMoves) {
            matrix.data[move.y][move.x] = this.symbol;
            losses.push(this._getLosses(matrix, true));
            matrix.data[move.y][move.x] = '';
        }
        let movesWithLoses = [];
        for (let i = 0; i < possibleMoves.length; i++) {
            movesWithLoses.push({losses : losses[i], move : possibleMoves[i]});
        }
        movesWithLoses.sort((a, b) => a.losses - b.losses);
        let lengthSameLosses = 1;
        for(; lengthSameLosses < movesWithLoses.length; lengthSameLosses++){
            if(movesWithLoses[lengthSameLosses] !== movesWithLoses[lengthSameLosses - 1]) break;
        }
        let move = movesWithLoses[getRandomInt(0, lengthSameLosses)].move;
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