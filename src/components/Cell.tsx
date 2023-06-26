import React, { useState } from 'react';
import type Vector2 from '../classes/Vector2';
import gridCSS from '../css/grid.module.css'

interface IProps {
    children: string;
    pos: Vector2;
    clickFunc: (pos: Vector2) => void;
    style? : React.CSSProperties
}

const Cell = (props: IProps) => {

    const clickHandler = () => {
        if (props.children.length === 0) {
            props.clickFunc(props.pos);
        }
    };

    return (
        <td className={`${gridCSS.cell} noSelect`} onClick={clickHandler} style={props.style}>
            <p className={props.children ? gridCSS.playCellAnim : ''}>
                {props.children}
            </p>
        </td>
    );



}

export default Cell;