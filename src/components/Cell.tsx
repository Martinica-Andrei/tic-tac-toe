import React, { useContext } from 'react';
import type Vector2 from '../classes/Vector2';
import gridCSS from '../css/grid.module.css'
import GameContext from '../context/GameContext';

interface IProps {
    children: string;
    pos: Vector2;
    clickFunc: (pos: Vector2) => void;
    style? : React.CSSProperties
}

const Cell = (props: IProps) => {

    const gameContext = useContext(GameContext);

    const clickHandler = () => {
        if (props.children.length === 0) {
            props.clickFunc(props.pos);
        }
    };

    const className = props.children && gameContext.options.data.symbolAnimationToggle ? gridCSS.playCellAnim : '';

    return (
        <td className={`${gridCSS.cell} noSelect`} onClick={clickHandler} style={props.style}>
            <p className={className}>
                {props.children}
            </p>
        </td>
    );



}

export default Cell;