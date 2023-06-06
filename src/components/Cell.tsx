import React from 'react';
import Vector2 from '../classes/Vector2';

interface IProps {
    className? : string;
    children : string;
    pos : Vector2;
    clickFunc : (cell : Cell) => void;
}

interface IState {

}

class Cell extends React.Component<IProps, IState>{

    constructor(props: IProps) {
        super(props);

        this.state = {

        };
    }

    render(): React.ReactNode {
        return (
            <div className={`${this.props.className} noSelect`} onClick={this.clickHandler}>{this.props.children}</div>
        );
    }
    
    private clickHandler = () =>{
        if(this.props.children.length === 0){
        this.props.clickFunc(this);
        }
    }

}

export default Cell;