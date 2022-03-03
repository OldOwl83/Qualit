export class Grade
{
    constructor( idStudent, score = undefined )
    {
        if( typeof idStudent !== "number" || (typeof score !== 'undefined' && typeof score !== 'number' ) )
            throw TypeError( "Los objetos Grade toman dos number como parámetros." );

        this.idStudent = idStudent;
        this.score = score;
    }
}