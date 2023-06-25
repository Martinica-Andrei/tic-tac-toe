import React, {  type ChangeEvent, useContext, useState } from 'react';
import appCSS from '../css/app.module.css'
import generalOptionsCSS from '../css/generalOptions.module.css'
import GameContext from '../context/GameContext';
interface IProps {
    setMainMenuPage: () => void;
}
const GeneralOptions = (props: IProps) => {
    const gameContext = useContext(GameContext);
    const [playerSymbol, setPlayerSymbol] = useState(gameContext.options.playerSymbol);
    gameContext.options.playerSymbol = playerSymbol;
    const playerSymbolXHandler = (e: ChangeEvent<HTMLInputElement>): void =>{
        if(e.target.checked === false){
            setPlayerSymbol('O');
        }
        else{
            setPlayerSymbol('X');
        }
    }

    const playerSymbolOHandler = (e: ChangeEvent<HTMLInputElement>): void =>{
        if(e.target.checked === false){
            setPlayerSymbol('X');
        }
        else{
            setPlayerSymbol('O');
        }
    }

    return (
        <>
            <button className={appCSS.actionButton} onClick={props.setMainMenuPage}>Back</button>
            <div className={generalOptionsCSS.playerSymbolDiv}>
                <label>Player symbol : </label>
                <div>
                    <div>
                        <span>X</span>
                        <input type="checkbox" onChange={playerSymbolXHandler} checked={playerSymbol === 'X'}></input>
                    </div>
                    <div>
                        <span>O</span>
                        <input type="checkbox" onChange={playerSymbolOHandler} checked={playerSymbol !== 'X'}></input>
                    </div>
                </div>

            </div>
        </>
    )

};

export default GeneralOptions;