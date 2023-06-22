import Character from "./Character";
import Vector2 from "./Vector2";
import { IGameContext } from "../context/GameContext";
import type {IGridManagerPublicData} from "../components/GridManager"

class Player extends Character{
    constructor(gameContext : IGameContext, gridManagerRef :React.MutableRefObject<IGridManagerPublicData>){
        super(gameContext, gridManagerRef);
    }

    action() : void {
        this.gridManagerRef.current.setClickFunc(this.gridClickHandler);
    }

    gridClickHandler = (pos : Vector2) =>{
        const {x, y } = pos;
        this.gridManagerRef.current.setMatrixValue(y, x, this.symbol);
        this.gridManagerRef.current.setClickFunc(() =>{});
        this.gridManagerRef.current.nextCharacterAction();
    }

    destructor(): void {
        
    }
}

export default Player;