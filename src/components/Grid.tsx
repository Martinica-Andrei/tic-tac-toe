import React from 'react';
import gridCSS from '../css/grid.module.css';
import Cell from './Cell';

interface IProps {

}

interface IState {
    matrix: string[][]
}

class Grid extends React.Component<IProps, IState>{
    private _rows: number;
    private _cols: number;
    constructor(props: IProps) {
        super(props);

        this._rows = 3;
        this._cols = 3;

        this.state = {
            matrix: this.createMatrix()
        };


    }

    createRows() : any{
        var rows = [];

        for(let r = 0; r < this._rows; r++){
            let cells = [];
            var hasBottomClass = r === this._rows - 1 ? gridCSS.bottomDiv : '';
            for(let c = 0; c < this._cols; c++){
                var classes = gridCSS.cell + ' ' + hasBottomClass;
                if(c === this._cols - 1){
                   classes += ' ' + gridCSS.rightDiv;
                }
                cells.push(<Cell key={c} className={classes}></Cell>)
            }
            rows.push(<div key={r} className={gridCSS.row}>{cells}</div>);
        }
        return rows;
    }

    render(): React.ReactNode {
        
        var rows = this.createRows();
        return (
            <div className={gridCSS.grid}>
                {rows}
            </div>
        );
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


}

export default Grid;