export class Course
{
    constructor( name, stagesArr = [] )
    {
        this.course = name;
        this.stages = stagesArr;
    }

    addNewStage( stageObj )
    {
        for( let stage of this.stages)
            if( stage.stage === stageObj.stage )
                throw "Esta etapa ya existe.";

        this.stages.push( stageObj );
    }
}