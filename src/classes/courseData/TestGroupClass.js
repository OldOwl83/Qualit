export class TestGroup
{
    constructor( name = '(s/n)', percentWeight = 0, testsArr = [] )
    {
        if( typeof name !== "string" || typeof percentWeight !== "number" || !Array.isArray( testsArr ) )
            throw TypeError("Los objetos TestGroup toman un string, un number y un array como parámetros.");

        this.testGroup = name;
        this.percentWeight = percentWeight;
        this.tests = testsArr;
    }

    addNewTest( testObj )
    {
        for( const test of this.tests)
            if( test.test === testObj.test )
                throw Error( "Ya existe una evaluación con ese nombre." );

        let totalPercent = 0;

        for( const test of this.tests)
            totalPercent += test.percentWeight;

        if( totalPercent + testObj.percentWeight > 100 )
            throw Error( "La sumatoria de la incidencia porcentual de las evaluaciones de una categoría no puede superar el 100%." );

        this.tests.push( testObj );
    }

    updateTest( testIndex, name, weight, additionalData )
    {
        if( this.tests[ testIndex ].test !== name )    
            for( const test of this.tests)
                if( test.test === name )
                    throw Error("Ya existe una evaluación con ese nombre.");

        let totalPercent = 0;

        for( const test of this.tests)
            totalPercent += test.percentWeight;

        if( totalPercent - this.tests[ testIndex ].percentWeight + weight > 100 )
            throw Error( "La sumatoria de la incidencia porcentual de las evaluaciones de una categoría no puede superar el 100%." );

        this.tests[ testIndex ].test = name;
        this.tests[ testIndex ].percentWeight = weight;
        this.tests[ testIndex ].additionalData = additionalData;
    }

    deleteTest( testIndex )
    {
        this.tests.splice( testIndex, 1 );
    }

    getAverage( studentId )
    {
        let weights = 0;

        let unweightedGradesSum = 0;
        let unweightedGradesNum = 0;

        let weigthedGradesSum = 0;

        for( const test of this.tests )
        {
            if( test.grades.find( grade => grade.idStudent === studentId ).score !== null )
            {
                if( test.percentWeight )
                {
                    weigthedGradesSum += test.percentWeight * test.grades.find( grade => grade.idStudent === studentId ).score;
        
                    weights += test.percentWeight;
                }else
                {
                    unweightedGradesSum += test.grades.find( grade => grade.idStudent === studentId ).score;
        
                    unweightedGradesNum++;
                }
            }
        }
        
        if( unweightedGradesNum )
        {
            let unweightedGradesAverage = unweightedGradesSum / unweightedGradesNum;
        
            weigthedGradesSum += unweightedGradesAverage * ( 100 - weights );

            weights = 100;
        }

        return weigthedGradesSum / weights;
    }
}