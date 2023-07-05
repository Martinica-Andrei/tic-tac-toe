import Character from "./Character";
import Vector2 from "./Vector2";
import { doesMatrixHaveValue, getRandomInt, shuffleArray } from "./Utils";
import type { IGameContext } from "../context/GameContext";
import { isGameOver, type IGridManagerPublicData, type IMatrix } from "../components/GridManager"
import { AiDifficulty } from "./Constants";

class Ai extends Character {
    private _actionTimeout: NodeJS.Timeout | undefined;
    private _difficulty: number;
    private _actionBasedOnDifficulty: (possibleMoves: Vector2[]) => void;
    constructor(gameContext: IGameContext, gridManager: React.MutableRefObject<IGridManagerPublicData>) {
        super(gameContext, gridManager);
        this._difficulty = AiDifficulty.EASY;
        this._actionBasedOnDifficulty = this._easyAction;
        this._actionTimeout = undefined;
    }

    action(): void {
        const possibleMoves = this._getPossibleMoves(this.gridManager.current.matrix);
        if (possibleMoves.length === 0) return;
        this._actionTimeout = setTimeout(this._actionBasedOnDifficulty, getRandomInt(0, 500) + 100, possibleMoves);

    }

    private _doMove(move: Vector2) {
        this.gridManager.current.setMatrixValue(move.y, move.x, this.symbol);
        this.gridManager.current.nextCharacterAction();
    }

    private _doMoveIfWinningMove(possibleMoves: Vector2[]) {
        const move = this._isWinningMove(possibleMoves, this.symbol);
        if (move) {
            this._doMove(move);
            return true;
        }
        return false;
    }

    private _doMoveIfOpponentWinningMove(possibleMoves: Vector2[]) {
        const move = this._isWinningMove(possibleMoves, this.opponent.symbol);
        if (move) {
            this._doMove(move);
            return true;
        }
        return false;
    }

    private _doRandomMove(possibleMoves: Vector2[]) {
        shuffleArray(possibleMoves);
        const move = possibleMoves[0];
        this._doMove(move);
    }

    private _getPossibleMoves(matrix: IMatrix) {
        let possibleMoves: Vector2[] = [];

        for (let r = 0; r < this.gridManager.current.matrix.rows; r++) {
            for (let c = 0; c < matrix.cols; c++) {
                if (matrix.data[r][c].length === 0) {
                    possibleMoves.push(new Vector2(c, r));
                }
            }
        }
        return possibleMoves;
    }

    private _isWinningMove(possibleMoves: Vector2[], symbol: string) {
        const matrix = this.gridManager.current.matrix;
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
        for (const row of this.gridManager.current.matrix.data) {
            for (const cell of row) {
                if (cell === '') {
                    count++;
                }
            }
        }
        return (count === this.gridManager.current.matrix.rows * this.gridManager.current.matrix.cols);
    }

    private _easyAction = (possibleMoves: Vector2[]) => {
        this._doRandomMove(possibleMoves);
    }

    private _mediumAction = (possibleMoves: Vector2[]) => {
        const doPredictedMove = getRandomInt(0, 3) <= 1;
        if (doPredictedMove) {
            if (this._doMoveIfWinningMove(possibleMoves)) {
                return;
            }
            else if (this._doMoveIfOpponentWinningMove(possibleMoves)) {
                return;
            }
        }
        this._doRandomMove(possibleMoves);
    }

    private _hardAction = (possibleMoves: Vector2[]) => {
        if (this._doMoveIfWinningMove(possibleMoves)) {
            return;
        }
        else if (this._doMoveIfOpponentWinningMove(possibleMoves)) {
            return;
        }
        this._doRandomMove(possibleMoves);
    }

    private _impossibleAction = (possibleMoves: Vector2[]) => {
        if (this._isFirstMove()) {
            this._doRandomMove(possibleMoves);
            return;
        }
        if (this._doMoveIfWinningMove(possibleMoves)) {
            return;
        }
        else if (this._doMoveIfOpponentWinningMove(possibleMoves)) {
            return;
        }
        let matrix = this.gridManager.current.matrix;
        let lossesAndTies = [];
        for (const move of possibleMoves) {
            matrix.data[move.y][move.x] = this.symbol;
            lossesAndTies.push(this._getLossesAndTies(matrix, true));
            matrix.data[move.y][move.x] = '';
        }
        let movesWithLossesAndTies = [];
        for (let i = 0; i < possibleMoves.length; i++) {
            movesWithLossesAndTies.push({ score: lossesAndTies[i], move: possibleMoves[i] });
        }
        movesWithLossesAndTies.sort((a, b) => {
            if (a.score.x === b.score.x) {
                return a.score.y - b.score.y;
            }
            return a.score.x - b.score.x;
        });
        let lengthSameLosses = 1;
        for (; lengthSameLosses < movesWithLossesAndTies.length; lengthSameLosses++) {
            const firstScore = movesWithLossesAndTies[lengthSameLosses].score;
            const secondScore = movesWithLossesAndTies[lengthSameLosses - 1].score;
            if (firstScore.x !== secondScore.x || firstScore.y !== secondScore.y) break;
        }
        let move = movesWithLossesAndTies[getRandomInt(0, lengthSameLosses)].move;
        this._doMove(move);
    }

    // Vector2 x is losses and y is ties
    private _getLossesAndTies(matrix: IMatrix, isOpponentMove: boolean): Vector2 {
        let lossesAndTies = new Vector2(0, 0);
        const isGameOverValue = isGameOver(matrix);
        if (isGameOverValue) {
            if (isGameOverValue === this.opponent.symbol) {
                lossesAndTies.x++;
            }
            else if (isGameOverValue === 'tie') {
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
        else if (difficulty === AiDifficulty.IMPOSSIBLE) {
            this._actionBasedOnDifficulty = this._impossibleAction;
        }
        else {
            console.log(`!!! INVALID DIFFICULTY ${difficulty} !!!`);
        }
    }
}


export default Ai;