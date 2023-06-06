import Character from "./Character";
import type GridManager from "../components/GridManager";
import type Game from "../components/Game";
import Vector2 from "./Vector2";
import { shuffleArray } from "./Utils";


class Ai extends Character {

    constructor(game: Game, gridManager: GridManager) {
        super(game, gridManager);
    }

    action() {
        let possibleMoves : Vector2[] = [];

        for(let r = 0 ; r < this.gridManager.rows(); r++){
            for(let c =0; c < this.gridManager.cols(); c++){
                if(this.gridManager.state.matrix[r][c].length === 0){
                    possibleMoves.push(new Vector2(c, r));
                }
            }
        }     
        if(possibleMoves.length === 0) return;
        shuffleArray(possibleMoves);
        let move = possibleMoves[0];
        let matrix = this.gridManager.state.matrix;
        matrix[move.y][move.x] = this.symbol;
        this.gridManager.setState({matrix: matrix});
        this.gridManager.nextPlayerAction();
    }
}


export default Ai;