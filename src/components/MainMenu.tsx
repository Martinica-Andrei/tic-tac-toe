import React from 'react'
import appCSS from '../css/app.module.css'

interface ComponentProps {
   
}
interface ComponentState {
    hidden: boolean;
}

class MainMenu extends React.Component<ComponentProps, ComponentState> {

    constructor(props: ComponentProps) {
        super(props);

        this.state = {
            hidden: false,
        }
    }

    render(): React.ReactNode {
        if (this.state.hidden) {
            return null;
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
    }

}

export default MainMenu;