import React from 'react';
import Grid from './Grid';
import type Game from './Game';
import Character from '../classes/Character';
import Ai from '../classes/Ai';
import type Cell from './Cell';
import Player from '../classes/Player';
interface IProps {
    game: Game;
}

interface IState {
    matrix: string[][];
    clickFunc: (cell : Cell) => void;
}

class GridManager extends React.Component<IProps, IState>{
    private _rows: number;
    private _cols: number;
    private _characters: Character[];
    private _currentCharacterIndex: number;

    rows(): number {
        return this._rows;
    }

    cols(): number {
        return this._cols;
    }

    constructor(props: IProps) {
        super(props);

        this._rows = 3;
        this._cols = 3;
        //this._characters = [new Ai(this.props.game, this), new Ai(this.props.game, this)];
         this._characters = [new Player(this.props.game, this), new Ai(this.props.game, this)];
        this._currentCharacterIndex = 0;
        this._characters[0].symbol = 'O';
        this._characters[1].symbol = 'X';

        this.state = {
            matrix: this.createMatrix(),
            clickFunc: (cell) =>{}
        };

    }

    render(): React.ReactNode {
        
        return (
            <div>
                <Grid matrix={this.state.matrix} rows={this._rows} cols={this._cols} clickFunc={this.state.clickFunc}></Grid>
            </div>

        );

    }

    componentDidMount(): void {
        this._characters[0].action();
    }

    componentWillUnmount(): void {
      
    }

    nextPlayerAction (){
        this._currentCharacterIndex++;
        if (this._currentCharacterIndex >= this._characters.length) {
            this._currentCharacterIndex = 0;
        }
        this._characters[this._currentCharacterIndex].action();
    }

    private createMatrix(): string[][] {
        let matrix: string[][] = [];
        for (let r = 0; r < this._rows; r++) {
            matrix.push([]);
            for (let c = 0; c < this._cols; c++) {
                matrix[r].push('');
            }
        }
        return matrix;
    }

    private isGameOver(): boolean {
        return true;
    }
}

export default GridManager;