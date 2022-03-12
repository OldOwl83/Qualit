import { Stage } from "./StageClass";


export class Course
{
    constructor( name = '(sin nombre)', stagesArr = [], studentsArr )
    {
        if( typeof name !== "string" || !Array.isArray( stagesArr ) || ( !Array.isArray( studentsArr ) && studentsArr !== undefined ) )
            throw TypeError("Los objetos Course toman un string y dos arrays como parámetros.");

        this.course = name;
        this.stages = stagesArr;

        if( this.stages.length === 0 )
            this.addNewStage( undefined, undefined, undefined, studentsArr );
    }

    addNewStage( name, percentWeight, testGroupArr, studentsArr )
    {
        for( const stage of this.stages)
            if( stage.stage === name )
                throw Error( "Esta etapa ya existe." );
        
        let totalPercent = 0;

        for( const stage of this.stages)
            totalPercent += stage.percentWeight;

        if( totalPercent + percentWeight > 100 )
            throw Error( "La sumatoria de la incidencia porcentual de las etapas de un curso no puede superar el 100%." );

        return this.stages.push( new Stage( name, percentWeight, testGroupArr, studentsArr ) ) - 1;
    }

    updateStage( stageIndex, newName, newWeight = 0 )
    {
        if( !newName )
            throw Error( 'El nombre es obligatorio.' );

        if( this.stages[ stageIndex ].stage !== newName )
            for( const stage of this.stages)
                if( stage.stage === newName )
                    throw Error("Esta etapa ya existe.");

        let totalPercent = 0;

        for( const stage of this.stages)
            totalPercent += stage.percentWeight;

        if( totalPercent - this.stages[ stageIndex ].percentWeight + newWeight > 100 )
            throw Error( "La sumatoria de la incidencia porcentual de las etapas de un curso no puede superar el 100%." );
            
        this.stages[ stageIndex ].stage = newName;
        this.stages[ stageIndex ].percentWeight = newWeight;
    }

    deleteStage( stageIndex, studentsArr )
    {
        this.stages.splice( stageIndex, 1 );

        if( this.stages.length === 0 )
            this.addNewStage( undefined, undefined, undefined, studentsArr );
    }

    getAverage( studentId )
    {
        let weights = 0;

        let unweightedStageSum = 0;
        let unweightedStageNum = 0;

        let weigthedStageSum = 0;

        for( const stage of this.stages )
        {
            const stageAverage = stage.getAverage( studentId );

            if( !isNaN( stageAverage ) )
            {
                if( stage.percentWeight )
                {
                    weigthedStageSum += stage.percentWeight * stageAverage;
        
                    weights += stage.percentWeight;
                }else
                {
                    unweightedStageSum += stageAverage;
        
                    unweightedStageNum++;
                }
            }
        }
        
        if( unweightedStageNum )
        {
            let unweightedStageAverage = unweightedStageSum / unweightedStageNum;
        
            weigthedStageSum += unweightedStageAverage * ( 100 - weights );

            weights = 100;
        }

        return weigthedStageSum / weights;
    }
}