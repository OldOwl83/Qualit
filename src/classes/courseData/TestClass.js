export class Test
{
    constructor( name = '(s/n)', percentWeight = 0, additionalData = '', gradesArr = [] )
    {
        if( !name )
            throw Error( 'El nombre es obligatorio.' );
            
        if( typeof name !== "string" || typeof percentWeight !== "number" || typeof additionalData !== 'string' || !Array.isArray( gradesArr ) )
            throw TypeError("Los objetos Test toman dos strings, un number y un array como parámetros.");

        this.test = name;
        this.percentWeight = percentWeight;
        this.additionalData = additionalData;
        this.grades = gradesArr;
    }

    addNewGrade( gradeObj )
    {
        this.grades.push( gradeObj );
    }

    setGradeScore( idStudent, score )
    {
        for( let i = 0; i < this.grades.length; i ++ )
        {
            if( this.grades[i].idStudent === idStudent )
            {
                this.grades[i].score = score;
                break;
            }
        }
    }

    deleteGrade( idStudent )
    {
        this.grades = this.grades.filter( grade => grade.idStudent !== idStudent );
    }
}