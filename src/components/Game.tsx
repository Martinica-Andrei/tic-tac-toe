import React from 'react';
import MainMenu from './MainMenu';
import Grid from './Grid';

interface ComponentProps {

}

interface ComponentState {
    isMainMenu: boolean;
    isPlay: boolean;
}

class Game extends React.Component<ComponentProps, ComponentState>{
    constructor(props: ComponentProps) {
        super(props);

        this.state = {
            isMainMenu: true,
            isPlay: false
        };

    }

    render(): React.ReactNode {
        if (this.state.isMainMenu) {
            return (
                <MainMenu game={this}></MainMenu>
            );
        }
        if (this.state.isPlay) {
            return (
                <div style={{ width: "100%", height: "100%" }}>
                    <button style={{ width: "150px", height: "70px", fontSize: "30px" }} onClick={this.activateMainMenu}>Back</button>
                    <Grid></Grid>
                </div>
            );
        }
    }

    activateMainMenu = () =>{
        this.setState({isMainMenu : true, isPlay : false});
    }

    activateGame = () =>{
        this.setState({isMainMenu : false, isPlay : true});
    }
}

export default Game;