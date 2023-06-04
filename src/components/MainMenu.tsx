import React from 'react';
import appCSS from '../css/app.module.css';
interface ComponentProps {
    game : any
}
interface ComponentState {
}

class MainMenu extends React.Component<ComponentProps, ComponentState> {

    constructor(props: ComponentProps) {
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