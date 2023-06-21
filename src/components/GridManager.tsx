import React, { useReducer, useContext, useState, useEffect, useMemo } from 'react';
import Grid from './Grid';
import Ai from '../classes/Ai';
import Player from '../classes/Player';
import gridCSS from '../css/grid.module.css';
import {
    isArraySameValue, isMatrixColSameValue, isMatrixLeftToRightDiagonalSameValue, isMatrixRightToLeftDiagonalSameValue,
    doesMatrixHaveValue
} from '../classes/Utils'
import GameContext from '../context/GameContext';
import Vector2 from '../classes/Vector2';

// function in a function because i want to pass the return func to setState
const emptyClickFunc = () => {
    return (pos: Vector2) => {

    };
}

interface IMatrix {
    rows: number,
    cols: number;
    data: string[][]
}

const initialMatrix: IMatrix = {
    rows: 3,
    cols: 3,
    data: []
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

createMatrixData(initialMatrix);

export interface IGridManagerPublicData {
    setMatrixValue : (row : number, col : number, val : string) => void;
    setClickFunc : (func : (pos : Vector2) => void) => void;
    nextCharacterAction : () => void;
    matrix : IMatrix
}

const GridManager = () => {
    const gameContext = useContext(GameContext);

    const [matrix, setMatrix] = useReducer(matrixReducer, initialMatrix);
    const [clickFunc, setClickFunc] = useState(emptyClickFunc);
    const [nextCharacterAction,setNextCharacterAction] = useState(false);

    const setMatrixValue = (row : number, col : number, val : string) =>{
        setMatrix({setCell : {row : row, col : col , value : val}});
    }
 
    const setClickFuncWrapper = (func : (pos : Vector2) => void) =>{
        setClickFunc(() => func);
    }

    const nextCharacterActionWrapper = () =>{
        setNextCharacterAction(prev => !prev);
    }

    const gridManagerPublicData : IGridManagerPublicData = {
        setMatrixValue : setMatrixValue,
        setClickFunc : setClickFuncWrapper,
        nextCharacterAction : nextCharacterActionWrapper,
        matrix: matrix
    }

    const initCharacters = () => {
        let player = new Player(gameContext, gridManagerPublicData);
        let ai = new Ai(gameContext, gridManagerPublicData);
        let characters = [player, ai];
        player.symbol = 'O';
        player.name = "Player";
        ai.symbol = 'X';
        ai.name = "AI";
        return characters;
    }

    const [characters, setCharacters] = useState(initCharacters);
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(-1);
    const [isGameOverState, setGameOverState] = useState('');

    useEffect(()=>{
        setCharacters(initCharacters());
        return () => {
            for (let character of characters) {
                character.destructor();
            }
        }

    }, [matrix, clickFunc]);

    const characterAction = () =>{
        var _isGameOver = isGameOver();
        if (_isGameOver.length > 0) {
            setGameOverState(_isGameOver);
            return;
        }
        let nextCharacterIndex = currentCharacterIndex + 1;
        if (nextCharacterIndex >= characters.length) {
            nextCharacterIndex = 0;
        }
        setCurrentCharacterIndex(nextCharacterIndex);
        characters[nextCharacterIndex].action();
    }

    useEffect(() => {
        characterAction();
    }, [nextCharacterAction]);


    const isGameOver = (): string => {
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

    const gameOverDiv = (): JSX.Element | undefined => {
        if (isGameOverState.length === 0) {
            return undefined;
        }
        let winner = characters.find(c => c.symbol === isGameOverState);
        let message = winner !== undefined ? `Winner : ${winner.name}` : "TIE";
        return (
            <div className={gridCSS.gameOverMessage}>{message}</div>
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

export default GridManager;