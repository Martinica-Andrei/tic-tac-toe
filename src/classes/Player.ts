import Character from "./Character";
import type GridManager from "../components/GridManager";
import type Game from "../components/Game";
import type Cell from "../components/Cell";

class Player extends Character{
    constructor(game : Game, gridManager: GridManager){
        super(game, gridManager);
    }

    action() {
        this.gridManager.setState({clickFunc : this.gridClickHandler});
    }

    gridClickHandler = (cell : Cell) =>{
        let gridMatrix = this.gridManager.state.matrix;
        gridMatrix[cell.props.pos.y][cell.props.pos.x] = this.symbol;
        this.gridManager.setState({matrix: gridMatrix, clickFunc: () =>{}});
        this.gridManager.nextPlayerAction();
    }
}

export default Player;