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

    let rows = [];
    const cellWidth = `${100 / props.cols}%`;
    const cellHeight = `${100 / props.rows}%`;
    const style = { width: cellWidth, height: cellHeight };
    for (let r = 0; r < props.rows; r++) {
        let cells = [];
        for (let c = 0; c < props.cols; c++) {
            cells.push(<Cell key={c} pos={new Vector2(c, r)} clickFunc={props.clickFunc}
                style={style}>{props.matrix[r][c]}</Cell>)
        }
        rows.push(<tr key={r}>{cells}</tr>)
    }

    return (
        <div className={gridCSS.grid}>
            <table className={gridCSS.table}>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    );

};

export default Grid;