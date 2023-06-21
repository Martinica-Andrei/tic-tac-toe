import React from 'react';
import gridCSS from '../css/grid.module.css';
import Cell from './Cell';
import Vector2 from '../classes/Vector2';

interface IProps {
    matrix: string[][];
    rows: number;
    cols: number;
    clickFunc: (pos: Vector2) => void;
}

const Grid = (props: IProps) => {

    const createCell = (r: number, c: number): JSX.Element => {
        var hasBottomClass = r === props.rows - 1 ? gridCSS.bottomDiv : '';
        var classes = gridCSS.cell + ' ' + hasBottomClass;
        if (c === props.cols - 1) {
            classes += ' ' + gridCSS.rightDiv;
        }
        return <Cell pos={new Vector2(c, r)} clickFunc={props.clickFunc} key={c} className={classes}>{props.matrix[r][c]}</Cell>;
    }

    const createCellsForRow = (r: number): JSX.Element[] => {
        let cells = [];
        for (let c = 0; c < props.cols; c++) {
            cells.push(createCell(r, c));
        }
        return cells;
    }

    const createDivRow = (r: number): JSX.Element => {
        let cells = createCellsForRow(r);
        return <div key={r} className={gridCSS.row}>{cells}</div>;
    }

    const createDivRows = (): JSX.Element[] => {
        var divRows = [];
        for (let r = 0; r < props.rows; r++) {
            divRows.push(createDivRow(r));
        }
        return divRows;
    }

    var divRows = createDivRows();
    return (
        <div className={gridCSS.grid}>
            {divRows}
        </div>
    );

};

export default Grid;