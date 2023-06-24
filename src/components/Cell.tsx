import React from 'react';
import type Vector2 from '../classes/Vector2';

interface IProps {
    className?: string;
    children: string;
    pos: Vector2;
    clickFunc: (pos : Vector2) => void;
}

const Cell = (props: IProps) =>{


    const clickHandler = () => {
        if (props.children.length === 0) {
            props.clickFunc(props.pos);
        }
    };

    return (
        <div className={`${props.className} noSelect`} onClick={clickHandler}>{props.children}</div>
    );



}

export default Cell;