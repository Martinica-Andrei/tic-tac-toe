import React, { useReducer, useContext, useState, useEffect, useMemo, useRef } from 'react';
import Grid from './Grid';
import Ai from '../classes/Ai';
import Player from '../classes/Player';
import type Character from '../classes/Character';
import gridCSS from '../css/grid.module.css';
import {
    isArraySameValue, isMatrixColSameValue, isMatrixLeftToRightDiagonalSameValue, isMatrixRightToLeftDiagonalSameValue,
    doesMatrixHaveValue,
    getRandomInt
} from '../classes/Utils'
import GameContext from '../context/GameContext';
import type Vector2 from '../classes/Vector2';

// function in a function because i want to pass the return func to setState
const emptyClickFunc = () => {
    return (pos: Vector2) => {

    };
}

export interface IMatrix {
    rows: number,
    cols: number;
    data: string[][]
}

const createMatrixData = (matrix: IMatrix) => {
    matrix.data = [];
    let data = matrix.data;
    for (let i = 0; i < matrix.rows; i++) {
        data.push([]);
        for (let j = 0; j < matrix.cols; j++) {
            data[i].push('');
        }
    }
    return matrix;
}

interface IMatrixAction {
    setCell?: {
        row: number;
        col: number;
        value: string;
    }
    setSize?: {
        rows?: number;
        cols?: number;
    }
}

const matrixReducer = (state: IMatrix, action: IMatrixAction) => {
    let newState = { ...state };
    if (action.setSize) {
        const { rows, cols } = action.setSize;
        if (rows) {
            newState.rows = rows;
        }
        if (cols) {
            newState.cols = cols;
        }
        createMatrixData(newState);
    }
    if (action.setCell) {
        const { row, col, value } = action.setCell;
        newState.data[row][col] = value;
    }
    return newState;
}

const initMatrix = () => {
    const initialMatrix: IMatrix = {
        rows: 3,
        cols: 3,
        data: []
    }
    createMatrixData(initialMatrix);
    return initialMatrix;
}

export interface IGridManagerPublicData {
    setMatrixValue: (row: number, col: number, val: string) => void;
    setClickFunc: (func: (pos: Vector2) => void) => void;
    nextCharacterAction: () => void;
    matrix: IMatrix
}

interface IProps {
    aiDifficulty: number
}

const GridManager = (props : IProps) => {
    const gameContext = useContext(GameContext);
    const [matrix, setMatrix] = useReducer(matrixReducer, useMemo(initMatrix, []));
    const [clickFunc, setClickFunc] = useState(emptyClickFunc);
    const [nextCharacterAction, setNextCharacterAction] = useState(false);

    const setMatrixValue = (row: number, col: number, val: string) => {
        setMatrix({ setCell: { row: row, col: col, value: val } });
    }

    const setClickFuncWrapper = (func: (pos: Vector2) => void) => {
        setClickFunc(() => func);
    }

    const nextCharacterActionWrapper = () => {
        setNextCharacterAction(prev => !prev);
    }

    const gridManagerPublicDataCopy: IGridManagerPublicData = {
        setMatrixValue: setMatrixValue,
        setClickFunc: setClickFuncWrapper,
        nextCharacterAction: nextCharacterActionWrapper,
        matrix: matrix

    };

    const gridManagerPublicData = useRef(gridManagerPublicDataCopy);
    gridManagerPublicData.current = gridManagerPublicDataCopy;
    const initCharacters = () => {
        let player = new Player(gameContext, gridManagerPublicData.current);
        let ai = new Ai(gameContext, gridManagerPublicData.current);
        ai.setDifficulty(props.aiDifficulty);
        let characters = [player, ai];
        player.symbol = gameContext.options.playerSymbol;
        player.name = "Player";
        ai.symbol = player.symbol === 'X' ? 'O' : 'X';
        ai.name = "AI";
        player.opponent = ai;
        ai.opponent = player;
        return characters;
    }

    const characters = useRef(useMemo(initCharacters, []));
    const currentCharacterIndex = useRef(getRandomInt(-1, 1));
    const [isGameOverState, setGameOverState] = useState('');

    useEffect(() => {
        return () => {
            for (let character of characters.current) {
                character.destructor();
            }
        }

    }, []);

    const characterAction = () => {
        var _isGameOver = isGameOver(matrix);
        if (_isGameOver.length > 0) {
            setGameOverState(_isGameOver);
            return;
        }
        currentCharacterIndex.current++;
        if (currentCharacterIndex.current >= characters.current.length) {
            currentCharacterIndex.current = 0;
        }
        characters.current[currentCharacterIndex.current].action();
    }

    useEffect(() => {
        characterAction();
    }, [nextCharacterAction]);

    const gameOverDiv = (): JSX.Element | undefined => {
        if (isGameOverState.length === 0) {
            return undefined;
        }
        let winner = characters.current.find(c => c.symbol === isGameOverState);
        let message = winner !== undefined ? `Winner : ${winner.name}` : "TIE";
        return (
            <>
                <div className={gridCSS.gameOverMessage}>
                    <p>{message}</p>
                    <button onClick={gameContext.state.setPlay}>Play again</button>
                </div>
            </>
        );

    }

    return (
        <div>
            <button style={{ width: "200px", height: "70px", fontSize: "30px" }} onClick={gameContext.state.setMainMenu}>Main Menu</button>
            <Grid matrix={matrix.data} rows={matrix.rows} cols={matrix.cols} clickFunc={clickFunc}></Grid>
            {gameOverDiv()}
        </div>
    );

};

export const isGameOver = (matrix : IMatrix): string => {
    for (let i = 0; i < matrix.rows; i++) {
        if (matrix.data[i][0].length && isArraySameValue(matrix.data[i])) {
            return matrix.data[i][0];
        }
        if (matrix.data[0][i].length && isMatrixColSameValue(matrix.data, i)) {
            return matrix.data[0][i];
        }
    }
    if (matrix.data[0][0].length && isMatrixLeftToRightDiagonalSameValue(matrix.data)) {
        return matrix.data[0][0];
    }
    if (matrix.data[0][matrix.cols - 1] && isMatrixRightToLeftDiagonalSameValue(matrix.data)) {
        return matrix.data[0][matrix.rows - 1];
    }
    if (matrix.data[0][0].length && doesMatrixHaveValue(matrix.data, '') === false) {
        return 'tie'
    }
    return '';
}

export default GridManager;