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

const GridManager = (props: IProps) => {
    const gameContext = useContext(GameContext);
    const [matrix, setMatrix] = useReducer(matrixReducer, useMemo(initMatrix, []));
    const [clickFunc, setClickFunc] = useState(emptyClickFunc);
    const [nextCharacterAction, setNextCharacterAction] = useState(true);

    const setMatrixValue = (row: number, col: number, val: string) => {
        setMatrix({ setCell: { row: row, col: col, value: val } });
    }

    const setClickFuncWrapper = (func: (pos: Vector2) => void) => {
        setClickFunc(() => func);
    }

    const activateNextCharacterAction = () => {
        setNextCharacterAction(true);
    }
    const gridManagerPublicDataCopy: IGridManagerPublicData = {
        setMatrixValue: setMatrixValue,
        setClickFunc: setClickFuncWrapper,
        nextCharacterAction: activateNextCharacterAction,
        matrix: matrix

    };

    const gridManagerPublicData = useRef(gridManagerPublicDataCopy);
    gridManagerPublicData.current = gridManagerPublicDataCopy;
    const initCharacters = () => {
        let player = new Player(gameContext, gridManagerPublicData);
        let ai = new Ai(gameContext, gridManagerPublicData);
        ai.setDifficulty(props.aiDifficulty);
        let characters = [player, ai];
        player.symbol = gameContext.options.data.playerSymbol;
        player.name = "Player";
        ai.symbol = player.symbol === 'X' ? 'O' : 'X';
        ai.name = "AI";
        player.opponent = ai;
        ai.opponent = player;
        return characters;
    }

    const characters = useRef(useMemo(initCharacters, []));
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(getRandomInt(0, 2));
    const [isGameOverState, setGameOverState] = useState('');

    useEffect(() => {
        return () => {
            for (let character of characters.current) {
                character.destructor();
            }
        }

    }, []);


    const setGameOver = (gameOverValue: string) => {
        const difficultyScore = gameContext.aiScore.data.difficulties[gameContext.options.data.aiDifficulty];
        if (gameOverValue === 'tie') {
            difficultyScore.ties++;
        }
        else {
            const winner = characters.current.find(c => c.symbol === gameOverValue);
            if (winner instanceof Player) {
                difficultyScore.wins++;
            }
            else {
                difficultyScore.losses++;
            }
        }
        gameContext.aiScore.updateLocalStorage();
        setGameOverState(gameOverValue);
    }


    const characterAction = () => {
        var _isGameOver = isGameOver(matrix);
        if (_isGameOver.length > 0) {
            setGameOver(_isGameOver);
            return;
        }
        let nextIndex = currentCharacterIndex + 1;
        if (nextIndex >= characters.current.length) {
            nextIndex = 0;
        }
        characters.current[nextIndex].action();
        setCurrentCharacterIndex(nextIndex);
    }

    useEffect(() => {
        if (nextCharacterAction === true) {
            characterAction();
            setNextCharacterAction(false);
        }
    }, [nextCharacterAction]);

    const gameOverHtml = (): [JSX.Element | undefined, JSX.Element | undefined] => {
        if (isGameOverState.length === 0) {
            return [undefined, undefined]
        }
        let winner = characters.current.find(c => c.symbol === isGameOverState);
        let message = winner !== undefined ? `Winner : ${winner.name}` : "TIE";
        return [<p>{message}</p>, <button className={gridCSS.restartGameButton} onClick={gameContext.state.setPlay}>Play again</button>];

    }

    const [gameOverMessage, restartGameButton] = gameOverHtml();

    return (
        <>
            <div className={gridCSS.nav}>
                <button style={{ width: "200px", height: "70px", fontSize: "30px" }} onClick={gameContext.state.setMainMenu}>Main Menu</button>
            </div>
            <div className={gridCSS.gameOverMessage}>
                {gameOverMessage}
            </div>
            <div className={gridCSS.leftDiv}>

            </div>
            <div className={gridCSS.middleDiv}>
                <Grid gridManager={gridManagerPublicData.current} clickFunc={clickFunc}></Grid>
            </div>
            <div className={gridCSS.rightDiv}>
                <p style={{ fontSize: "50px", color: "white" , margin: "30px"}}>{characters.current[currentCharacterIndex].name} turn</p>
            </div>
            <div className={gridCSS.footerDiv}>
                {restartGameButton}
            </div>
        </>
    );

};

export const isGameOver = (matrix: IMatrix): string => {
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