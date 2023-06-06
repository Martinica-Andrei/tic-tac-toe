import React from 'react';
import MainMenu from './MainMenu';
import GridManager from './GridManager';

interface IProps {

}

interface IState {
    isMainMenu: boolean;
    isPlay: boolean;
}

class Game extends React.Component<IProps, IState>{
    constructor(props: IProps) {
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
        else if (this.state.isPlay) {
            return (
                <div style={{ width: "100%", height: "100%" }}>
                    <button style={{ width: "150px", height: "70px", fontSize: "30px" }} onClick={this.activateMainMenu}>Back</button>
                    <GridManager game={this}></GridManager>
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