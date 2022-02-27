export class TestGroup
{
    constructor( name = 's/n', percentWeight = 0, testsArr = [] )
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

        this.tests.push( testObj );
    }

    updateTest( testIndex, name, weight, additionalData )
    {
        if( this.tests[ testIndex ].test !== name )    
            for( const test of this.tests)
                if( test.test === name )
                    throw Error("Ya existe una evaluación con ese nombre.");

        this.tests[ testIndex ].test = name;
        this.tests[ testIndex ].percentWeight = weight;
        this.tests[ testIndex ].additionalData = additionalData;
    }

    deleteTest( testIndex )
    {
        this.tests.splice( testIndex, 1 );
    }
}