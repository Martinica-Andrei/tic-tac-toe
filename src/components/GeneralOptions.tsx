import { type ChangeEvent, useContext, useState, useEffect } from 'react';
import appCSS from '../css/app.module.css'
import generalOptionsCSS from '../css/generalOptions.module.css'
import GameContext from '../context/GameContext';
import MainMenuContext from '../context/MainMenuContext';



const GeneralOptions = () => {
    const gameContext = useContext(GameContext);
    const mainMenuContext = useContext(MainMenuContext);
    const [playerSymbol, setPlayerSymbol] = useState(gameContext.options.data.playerSymbol);
    const [symbolAnimationToggle, setSymbolAnimationToggle] = useState(gameContext.options.data.symbolAnimationToggle);
    const [menuAnimationToggle, setMenuAnimationToggle] = useState(gameContext.options.data.menuAnimationToggle);

    const playerSymbolXHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setPlayerSymbol(e.target.checked ? 'X' : 'O');
    }

    const playerSymbolOHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setPlayerSymbol(e.target.checked ? 'O' : 'X');
    }

    const symbolAnimationToggleHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setSymbolAnimationToggle(e.target.checked);
    }
    const menuAnimationToggleHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setMenuAnimationToggle(e.target.checked);
    }

    useEffect(() => {
        gameContext.options.data.playerSymbol = playerSymbol;
    }, [playerSymbol]);

    useEffect(() => {
        gameContext.options.data.symbolAnimationToggle = symbolAnimationToggle;
    }, [symbolAnimationToggle]);
    useEffect(() => {
        gameContext.options.data.menuAnimationToggle = menuAnimationToggle;
    }, [menuAnimationToggle]);

    useEffect(() => {
        gameContext.options.updateLocalStorage();
    });

    return (
        <>
            <button className={appCSS.actionButton} onClick={() => { mainMenuContext.setMainMenuPage(); mainMenuContext.setAnimClass(appCSS.playFadeRight) }}>Back</button>
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
                <div className={generalOptionsCSS.singleToggleDiv}>
                    <label>Symbol animation toggle</label>
                    <input type="checkbox" onChange={symbolAnimationToggleHandler} checked={symbolAnimationToggle}></input>
                </div>
                <div className={generalOptionsCSS.singleToggleDiv}>
                    <label>Menu animation toggle</label>
                    <input type="checkbox" onChange={menuAnimationToggleHandler} checked={menuAnimationToggle}></input>
                </div>
            </div>
        </>
    )

};

export default GeneralOptions;