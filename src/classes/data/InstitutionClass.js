
export class Institution
{
    constructor( name, groupsArr = [] )
    {
        this.institution = name;
        this.groups = groupsArr;
    }

    changeName( newName )
    {
        this.institution = newName;
    }

    addNewGroup( groupObj )
    {
        for( let group of this.groups)
            if( group.group === groupObj.group )
                throw "Este gurpo ya existe.";

        this.groups.push( groupObj );
    }
}