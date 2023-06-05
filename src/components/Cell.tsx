import React from 'react';

interface IProps {
    className? : string;
    children? : string;
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
            <div className={`${this.props.className} noSelect`}>{this.props.children}</div>
        );
    }
    
    

}

export default Cell;