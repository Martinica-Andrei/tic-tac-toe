import React, { SetStateAction } from "react";  

export interface IMainMenuContext{
    setMainMenuPage : () => void;
    setAnimEndCallback : (callback : () => void) => void;
    setAnimClass : (className : string) => void;

}

const MainMenuContext = React.createContext<IMainMenuContext>({
    setMainMenuPage: () => {},
    setAnimEndCallback: () => {},
    setAnimClass: () => {}
});

export default MainMenuContext;
