import type {IGridManagerPublicData} from "../components/GridManager"
import type {IGameContext} from "../context/GameContext";

abstract class Character {
    gameContext : IGameContext;
    gridManager : IGridManagerPublicData;
    symbol: string;
    name : string;

    constructor(gameContext : IGameContext, gridManager : IGridManagerPublicData) {
        this.gameContext = gameContext;
        this.gridManager =  gridManager;
        this.symbol = '';
        this.name = '';
    }

    abstract action() : void;
    abstract destructor() : void;

}

export default Character;