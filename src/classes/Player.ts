import Character from "./Character";
import Vector2 from "./Vector2";
import type { IGameContext } from "../context/GameContext";
import type {IGridManagerPublicData} from "../components/GridManager"

class Player extends Character{
    constructor(gameContext : IGameContext, gridManager : React.MutableRefObject<IGridManagerPublicData>){
        super(gameContext, gridManager);
    }

    action() : void {
        this.gridManager.current.setClickFunc(this._gridClickHandler);
    }

    private _gridClickHandler = (pos : Vector2) =>{
        const {x, y } = pos;
        this.gridManager.current.setMatrixValue(y, x, this.symbol);
        this.gridManager.current.setClickFunc(() =>{});
    }

    destructor(): void {
        
    }
}

export default Player;