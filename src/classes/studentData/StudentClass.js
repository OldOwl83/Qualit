export class Student
{
    constructor( lastName, firstName, additionalData, id = 0 )
    {
        if( typeof lastName !== "string" || typeof firstName !== "string" || typeof additionalData !== "string" )
            throw TypeError( "Los objetos Student toman tres string y un array como parámetros." );

        if( !lastName )
            throw Error( "El parámetro 'lastName' es obligatorio." );

        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.additionalData = additionalData;
    }

    assignID( id )
    {
       this.id = id;
    }
}