import { TestGroup } from "./TestGroupClass";


export class Stage
{
    constructor( name = '(sin nombre)', percentWeight = 0, testGroupArr = [], studentsArr )
    {
        if( typeof name !== "string" || typeof percentWeight !== "number" || !Array.isArray( testGroupArr ) || ( !Array.isArray( studentsArr ) && studentsArr !== undefined ) )
            throw TypeError("Los objetos Stage toman un string, un number y dos array como parámetros.");

        this.stage = name;
        this.percentWeight = percentWeight;
        this.testGroups = testGroupArr;

        if( this.testGroups.length === 0 )
            this.addNewTestGroup( undefined, undefined, undefined, studentsArr );
    }

    addNewTestGroup( name, percentWeight, testsArr, studentsArr )
    {
        for( const tG of this.testGroups)
            if( tG.testGroup === name )
                throw Error( "Esta categoría ya existe." );

        let totalPercent = 0;

        for( const tG of this.testGroups)
            totalPercent += tG.percentWeight;

        if( totalPercent + percentWeight > 100 )
            throw Error( "La sumatoria de la incidencia porcentual de las categorías de una etapa no puede superar el 100%." );

        return this.testGroups.push( new TestGroup( name, percentWeight, testsArr, studentsArr ) ) - 1;
    }

    updateTestGroup( tGIndex, name, weight )
    {
        if( !name )
            throw Error( 'El nombre es obligatorio.' );
            
        if( this.testGroups[ tGIndex ].testGroup !== name )    
            for( const tG of this.testGroups)
                if( tG.testGroup === name )
                    throw Error("Esta categoría ya existe.");

        let totalPercent = 0;

        for( const tG of this.testGroups)
            totalPercent += tG.percentWeight;

        if( totalPercent - this.testGroups[ tGIndex ].percentWeight + weight > 100 )
            throw Error( "La sumatoria de la incidencia porcentual de las categorías de una etapa no puede superar el 100%." );

        this.testGroups[ tGIndex ].testGroup = name;
        this.testGroups[ tGIndex ].percentWeight = weight;
    }

    deleteTestGroup( tGIndex, studentsArr )
    {
        this.testGroups.splice( tGIndex, 1 );

        if( this.testGroups.length === 0 )
            this.addNewTestGroup( undefined, undefined, undefined, studentsArr );
    }

    getAverage( studentId )
    {
        let weights = 0;

        let unweightedTGSum = 0;
        let unweightedTGNum = 0;

        let weigthedTGSum = 0;

        for( const tG of this.testGroups )
        {
            const tGAverage = tG.getAverage( studentId );

            if( !isNaN( tGAverage ) )
            {
                if( tG.percentWeight )
                {
                    weigthedTGSum += tG.percentWeight * tGAverage;
        
                    weights += tG.percentWeight;
                }else
                {
                    unweightedTGSum += tGAverage;
        
                    unweightedTGNum++;
                }
            }
        }
        
        if( unweightedTGNum )
        {
            let unweightedTGAverage = unweightedTGSum / unweightedTGNum;
        
            weigthedTGSum += unweightedTGAverage * ( 100 - weights );

            weights = 100;
        }

        return weigthedTGSum / weights;
    }
}