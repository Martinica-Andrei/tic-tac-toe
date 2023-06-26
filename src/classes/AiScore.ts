class Score{
    wins : number;
    losses : number;
    ties : number;
    constructor(){
        this.wins = 0;
        this.losses = 0;
        this.ties = 0;
    }
}

class AiScore{
    difficulties : Score[]
    constructor(){
        this.difficulties = [new Score(), new Score(), new Score(), new Score()];
    }
}

export default AiScore;