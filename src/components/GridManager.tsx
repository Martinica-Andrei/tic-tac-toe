import React, { useEffect } from 'react';
import Grid from './Grid';
import type Game from './Game';
import Character from '../classes/Character';
import Ai from '../classes/Ai';
interface IProps {
    game : Game;
}

interface IState {
    currentCharacterIndex: number;
    matrix: string[][];
}

class GridManager extends React.Component<IProps, IState>{
    private _rows: number;
    private _cols: number;
    private _characters: Character[];
    private _mainLoopInterval? : NodeJS.Timer;

    constructor(props: IProps) {
        super(props);

        this._rows = 3;
        this._cols = 3;
        this._characters = [new Ai(this.props.game, this), new Ai(this.props.game, this)];

        this.state = {
            currentCharacterIndex: 0,
            matrix: this.createMatrix()
        };

        this._mainLoopInterval = undefined;
    }

    render(): React.ReactNode {
        return (
            <div>
                <Grid matrix={this.state.matrix} rows={this._rows} cols={this._cols}></Grid>
            </div>

        );

    }

    componentDidMount(): void {
        this._mainLoopInterval = setInterval(this.mainLoop, 13.333333333333);
    }

    componentWillUnmount(): void {
        clearInterval(this._mainLoopInterval);
    }

    mainLoop = () =>{
        console.log("main loop called");
    }

    private createMatrix(): string[][] {
        let matrix: string[][] = [];
        for (let r = 0; r < this._rows; r++) {
            matrix.push([]);
            for (let c = 0; c < this._cols; c++) {
                matrix[r].push(' ');
            }
        }
        return matrix;
    }

    private isGameOver(): boolean {
        return true;
    }
}

export default GridManager;