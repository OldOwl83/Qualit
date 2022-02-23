import { TestGroup } from "./TestGroupClass";

export class Stage
{
    constructor( name = '(sin nombre)', percentWeight = 0, testGroupArr = [ new TestGroup() ] )
    {
        if( typeof name !== "string" || typeof percentWeight !== "number" || !Array.isArray( testGroupArr ) )
            throw TypeError("Los objetos Stage toman un string, un number y un array como parámetros.");

        this.stage = name;
        this.percentWeight = percentWeight;
        this.testGroups = testGroupArr;
    }

    addNewTestGroup( testGroupObj )
    {
        for( const tG of this.testGroups)
            if( tG.testGroup === testGroupObj.testGroup )
                throw Error( "Esta categoría ya existe." );

        this.testGroups.push( testGroupObj );
    }

    updateTestGroup( tGIndex, name, weight )
    {
        if( this.testGroups[ tGIndex ].testGroup !== name )    
            for( const tG of this.testGroups)
                if( tG.testGroup === name )
                    throw Error("Esta categoría ya existe.");

        this.testGroups[ tGIndex ].testGroup = name;
        this.testGroups[ tGIndex ].percentWeight = weight;
    }

    deleteTestGroup( tGIndex )
    {
        this.testGroups.splice( tGIndex, 1 );

        if( this.testGroups.length === 0 )
            this.addNewTestGroup( new TestGroup() );
    }
}