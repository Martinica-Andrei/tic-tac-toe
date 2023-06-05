import React from 'react';
import gridCSS from '../css/grid.module.css';
import Cell from './Cell';

interface IProps {
    matrix: string[][];
    rows: number;
    cols: number;
}

interface IState {
}

class Grid extends React.Component<IProps, IState>{

    constructor(props: IProps) {
        super(props);

        this.state = {
        };

    }

    createDivRows(): JSX.Element[] {

        var divRows = [];
        for (let r = 0; r < this.props.rows; r++) {
            divRows.push(this.createDivRow(r));
        }
        return divRows;
    }

    createDivRow(r: number): JSX.Element {
        let cells = this.createCellsForRow(r);
        return <div key={r} className={gridCSS.row}>{cells}</div>;
    }

    createCell(r: number, c: number): JSX.Element {
        var hasBottomClass = r === this.props.rows - 1 ? gridCSS.bottomDiv : '';
        var classes = gridCSS.cell + ' ' + hasBottomClass;
        if (c === this.props.cols - 1) {
            classes += ' ' + gridCSS.rightDiv;
        }
        return <Cell key={c} className={classes}>{this.props.matrix[r][c]}</Cell>;
    }

    createCellsForRow(r: number): JSX.Element[] {
        let cells = [];
        for (let c = 0; c < this.props.cols; c++) {
            cells.push(this.createCell(r, c));
        }
        return cells;
    }

    render(): React.ReactNode {

        var divRows = this.createDivRows();
        return (
            <div className={gridCSS.grid}>
                {divRows}
            </div>
        );
    }

}

export default Grid;