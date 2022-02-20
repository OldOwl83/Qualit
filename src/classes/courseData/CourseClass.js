export class Course
{
    constructor( name, stagesArr = [] )
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

    updateStageName( stageIndex, newName )
    {
        if( this.stages[ stageIndex ].stage === newName )
            return;

        for( const stage of this.stages)
            if( stage.stage === newName )
                throw Error("Esta etapa ya existe.");

        this.stages[ stageIndex ].stage = newName;
    }
}