import React from 'react';
import appCSS from '../css/app.module.css';
import type Game from './Game';

interface IProps {
    game : Game;
}
interface IState {
}

class MainMenu extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
        };
    }

    render(): React.ReactNode {
        return (
            <div>
                <h1 className={appCSS.title}>Tic Tac Toe</h1>
                <div className={appCSS.gameMenu}>
                    <button className={appCSS.actionButton} onClick={this.props.game.activateGame}>Play</button>
                    <button className={appCSS.actionButton}>Options</button>
                    <button className={appCSS.actionButton}>Leaderboard</button>
                </div>
            </div>
        );
    }

    playHandler = () =>{
        this.setState({hidden:true});
    }

}

export default MainMenu;