import React from 'react';
import type Vector2 from '../classes/Vector2';

interface IProps {
    className?: string;
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
        <td className={`${props.className} noSelect`} onClick={clickHandler} style={props.style}>
            <p>
                {props.children}
            </p>
        </td>
    );



}

export default Cell;