import React from 'react';
import Grid from './Grid';

class Game extends React.Component<{},{}>{

    constructor(props :{}){
        super(props);

        this.state = {

        };
    }

    render(): React.ReactNode {
        return (
            <Grid></Grid>
        );
    }
}

export default Game;