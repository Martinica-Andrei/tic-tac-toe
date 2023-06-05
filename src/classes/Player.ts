import Character from "./Character";
import type GridManager from "../components/GridManager";
import type Game from "../components/Game";

class Player extends Character{
    constructor(game : Game, gridManager: GridManager){
        super(game, gridManager);
    }

    action() : void {

    }
}

export default Player;