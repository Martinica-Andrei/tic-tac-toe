import gridCSS from '../css/grid.module.css';
import Cell from './Cell';
import Vector2 from '../classes/Vector2';
import type { IGridManagerPublicData } from './GridManager';

interface IProps {
    gridManager : IGridManagerPublicData;
    clickFunc: (pos: Vector2) => void;
}

const Grid = (props: IProps) => {

    let rows = [];
    const cellWidth = `${100 / props.gridManager.matrix.cols}%`;
    const cellHeight = `${100 / props.gridManager.matrix.rows}%`;
    const style = { width: cellWidth, height: cellHeight };
    for (let r = 0; r < props.gridManager.matrix.rows; r++) {
        let cells = [];
        for (let c = 0; c < props.gridManager.matrix.cols; c++) {
            cells.push(<Cell key={c} pos={new Vector2(c, r)} clickFunc={props.clickFunc} gridManager={props.gridManager}
                style={style}>{props.gridManager.matrix.data[r][c]}</Cell>)
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