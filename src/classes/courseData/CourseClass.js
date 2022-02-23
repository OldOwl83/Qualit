import { Stage } from "./StageClass";

export class Course
{
    constructor( name, stagesArr = [ new Stage() ] )
    {
        if( typeof name !== "string" || !Array.isArray( stagesArr ) )
            throw TypeError("Los objetos Course toman un string y un array como parámetros.");

        this.course = name;
        this.stages = stagesArr;
    }

    addNewStage( stageObj )
    {
        for( const stage of this.stages)
            if( stage.stage === stageObj.stage )
                throw Error( "Esta etapa ya existe." );

        this.stages.push( stageObj );
    }

    updateStage( stageIndex, newName, newWeight = 0 )
    {
        if( this.stages[ stageIndex ].stage !== newName )
            for( const stage of this.stages)
                if( stage.stage === newName )
                    throw Error("Esta etapa ya existe.");
            
        this.stages[ stageIndex ].stage = newName;
        this.stages[ stageIndex ].percentWeight = newWeight;
    }

    deleteStage( stageIndex )
    {
        this.stages.splice( stageIndex, 1 );

        if( this.stages.length === 0 )
            this.addNewStage( new Stage() );
    }
}