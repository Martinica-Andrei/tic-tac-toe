import React, { useContext } from 'react';
import type Vector2 from '../classes/Vector2';
import gridCSS from '../css/grid.module.css'
import appCSS from '../css/app.module.css'
import GameContext from '../context/GameContext';
import type { IGridManagerPublicData } from './GridManager';

interface IProps {
    children: string;
    pos: Vector2;
    clickFunc: (pos: Vector2) => void;
    style?: React.CSSProperties
    gridManager: IGridManagerPublicData;
}

const Cell = (props: IProps) => {

    const gameContext = useContext(GameContext);

    const clickHandler = () => {
        if (props.children.length === 0) {
            props.clickFunc(props.pos);
        }
    };
    const animName = gameContext.options.data.symbolAnimationToggle ? gridCSS.playCellAnim : appCSS.playNoAnim;
    const className = props.children ? animName : '';
    

    return (
        <td className={`${gridCSS.cell} noSelect`} onClick={clickHandler} style={props.style}>
            <p className={className} onAnimationEnd={props.gridManager.nextCharacterAction}>
                {props.children}
            </p>
        </td>
    );



}

export default Cell;