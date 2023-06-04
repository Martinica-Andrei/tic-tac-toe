import React from 'react';
import Grid from './Grid';
import Character from '../classes/Character';
interface IProps {

}

interface IState {
    characters: Character[];
    currentCharacterIndex: number;
}

class GridManager extends React.Component<IProps, IState>{
    
    constructor(props : IProps){
        super(props);

        this.state = {
            characters: [],
            currentCharacterIndex: 0,
        }
    }

    render(): React.ReactNode {
        return (
            <Grid></Grid>
        );
    }
}

export default GridManager;