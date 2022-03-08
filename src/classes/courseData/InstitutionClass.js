
export class Institution
{
    constructor( name, groupsArr = [] )
    {
        if( typeof name !== "string" || !Array.isArray( groupsArr ) )
            throw TypeError("Los objetos Institution toman un string y un array como parámetros.");

        this.institution = name;
        this.groups = groupsArr;
    }

    addNewGroup( groupObj )
    {
        for( const group of this.groups)
            if( group.group === groupObj.group )
                throw Error("Este grupo ya existe.");

        this.groups.push( groupObj );
    }

    updateGroupName( groupIndex, newName )
    {
        if( !newName )
            throw Error( 'El nombre es obligatorio.' );

        if( this.groups[ groupIndex ].group === newName )
            return;

        for( const group of this.groups)
            if( group.group === newName )
                throw Error("Este grupo ya existe.");

        this.groups[ groupIndex ].group = newName;
    }

    deleteGroup( groupIndex )
    {
        this.groups.splice( groupIndex, 1 );
    }
}