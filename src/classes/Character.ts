import type GridManager from "../components/GridManager";
import type Game from "../components/Game";

class Character {
    game: Game;
    gridManager: GridManager;
    symbol: string;

    constructor(game: Game, gridManager: GridManager) {
        this.game = game;
        this.gridManager = gridManager;
        this.symbol = '';
    }

    action() : void {
       
    }

}

export default Character;