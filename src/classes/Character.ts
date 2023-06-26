import type {IGridManagerPublicData} from "../components/GridManager"
import type {IGameContext} from "../context/GameContext";

abstract class Character {
    gameContext : IGameContext;
    gridManager : React.MutableRefObject<IGridManagerPublicData>;
    symbol: string;
    name : string;
    opponent : Character

    constructor(gameContext : IGameContext, gridManager : React.MutableRefObject<IGridManagerPublicData>) {
        this.gameContext = gameContext;
        this.gridManager =  gridManager;
        this.symbol = '';
        this.name = '';
        this.opponent = this;
    }

    abstract action() : void;
    abstract destructor() : void;

}

export default Character;