import React from 'react'
import appCSS from '../css/app.module.css'
import Game from './Game';
interface ComponentProps {
   
}
interface ComponentState {
    hidden: boolean;
    isPlayGame: boolean;
}

class MainMenu extends React.Component<ComponentProps, ComponentState> {

    constructor(props: ComponentProps) {
        super(props);

        this.state = {
            hidden: false,
            isPlayGame: false,
        }
    }

    render(): React.ReactNode {
        if (this.state.hidden) {
            return null;
        }
        if(this.state.isPlayGame){
            return (
                <Game></Game>
            );
        }
        return (
            <div>
                <h1 className={appCSS.title}>Tic Tac Toe</h1>
                <div className={appCSS.gameMenu}>
                    <button className={appCSS.actionButton} onClick={this.playHandler}>Play</button>
                    <button className={appCSS.actionButton}>Options</button>
                    <button className={appCSS.actionButton}>Leaderboard</button>
                </div>
            </div>
        );
    }

    playHandler = () =>{
        this.setState({isPlayGame:true});
    }

}

export default MainMenu;