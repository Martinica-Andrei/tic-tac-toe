import { type ChangeEvent, useContext, useState, useEffect } from 'react';
import appCSS from '../css/app.module.css'
import generalOptionsCSS from '../css/generalOptions.module.css'
import GameContext from '../context/GameContext';

interface IProps {
    setMainMenuPage: () => void;
}

const GeneralOptions = (props: IProps) => {
    const gameContext = useContext(GameContext);
    const [playerSymbol, setPlayerSymbol] = useState(gameContext.options.data.playerSymbol);
    const [symbolAnimationToggle, setSymbolAnimationToggle] = useState(gameContext.options.data.symbolAnimationToggle);

    const playerSymbolXHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setPlayerSymbol(e.target.checked ? 'X' : 'O');
    }

    const playerSymbolOHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setPlayerSymbol(e.target.checked ? 'O' : 'X');
    }

    const symbolAnimationToggleHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setSymbolAnimationToggle(e.target.checked);
    }

    useEffect(() => {
        gameContext.options.data.playerSymbol = playerSymbol;
    }, [playerSymbol]);

    useEffect(() => {
        gameContext.options.data.symbolAnimationToggle = symbolAnimationToggle;
    }, [symbolAnimationToggle]);

    useEffect(() => {
        gameContext.options.updateLocalStorage();
    }, [playerSymbol, symbolAnimationToggle]);

    return (
        <>
            <button className={appCSS.actionButton} onClick={props.setMainMenuPage}>Back</button>
            <div className={generalOptionsCSS.generalOptions}>
                <div className={generalOptionsCSS.playerSymbolDiv}>
                    <label>Player symbol : </label>
                    <div>
                        <div>
                            <span>X</span>
                            <input type="checkbox" onChange={playerSymbolXHandler} checked={playerSymbol === 'X'}></input>
                        </div>
                        <div>
                            <span>O</span>
                            <input type="checkbox" onChange={playerSymbolOHandler} checked={playerSymbol === 'O'}></input>
                        </div>
                    </div>

                </div>
                <div className={generalOptionsCSS.symbolAnimationToggleDiv}>
                    <p>Symbol animation toggle</p>
                    <input type="checkbox" onChange={symbolAnimationToggleHandler} checked={symbolAnimationToggle}></input>
                </div>
            </div>
        </>
    )

};

export default GeneralOptions;