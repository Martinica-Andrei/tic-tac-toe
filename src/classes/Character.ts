import type {IGridManagerPublicData} from "../components/GridManager"
import type {IGameContext} from "../context/GameContext";

abstract class Character {
    gameContext : IGameContext;
    gridManagerRef : React.MutableRefObject<IGridManagerPublicData>;
    symbol: string;
    name : string;

    constructor(gameContext : IGameContext, gridManagerRef : React.MutableRefObject<IGridManagerPublicData>) {
        this.gameContext = gameContext;
        this.gridManagerRef =  gridManagerRef;
        this.symbol = '';
        this.name = '';
    }

    abstract action() : void;
    abstract destructor() : void;

}

export default Character;