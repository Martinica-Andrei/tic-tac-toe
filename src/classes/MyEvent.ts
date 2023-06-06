abstract class MyEvent{
    startFunc: () => void;
    updateFunc: () => void;
    endFunc: () => void;

    constructor(){
        this.startFunc = () =>{};
        this.updateFunc = () =>{};
        this.endFunc = () =>{};
    }

    abstract update() : void;
}

export default MyEvent;