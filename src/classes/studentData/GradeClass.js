export class Grade
{
    constructor( idStudent, score = null )
    {
        if( typeof idStudent !== "number" || (score !== null && typeof score !== 'number' ) )
            throw TypeError( "Los objetos Grade toman dos number como parámetros." );

        this.idStudent = idStudent;
        this.score = score;
    }
}