import React from 'react';
import gridCSS from '../css/grid.module.css'

interface ComponentProps {

}

interface ComponentState {
    matrix: string[][]
}

class Grid extends React.Component<ComponentProps, ComponentState>{
    private _rows: number;
    private _cols: number;
    constructor(props: {}) {
        super(props);

        this._rows = 3;
        this._cols = 3;

        this.state = {
            matrix: this.createMatrix()
        };


    }

    render(): React.ReactNode {
        
        var rows = [];

        for(let r = 0; r < this._rows; r++){
            let cells = [];
            var hasBottomClass = r == this._rows - 1 ? gridCSS.bottomDiv : '';
            for(let c = 0; c < this._cols; c++){
                var classes = gridCSS.cell + ' ' + hasBottomClass;
                if(c == this._cols - 1){
                   classes += ' ' + gridCSS.rightDiv;
                }
                cells.push(<div key={c} className={classes}></div>)
            }
            rows.push(<div key={r} className={gridCSS.row}>{cells}</div>);
        }
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