import { Grade } from '../studentData/GradeClass';


export class Test
{
    constructor( name = '(s/n)', percentWeight = 0, additionalData = '', gradesArr = [], studentsArr = [] )
    {
        if( !name )
            throw Error( 'El nombre es obligatorio.' );
            
        if( typeof name !== "string" || typeof percentWeight !== "number" || typeof additionalData !== 'string' || !Array.isArray( gradesArr ) || !Array.isArray( studentsArr ) )
            throw TypeError("Los objetos Test toman dos strings, un number y dos array como parámetros.");

        this.test = name;
        this.percentWeight = percentWeight;
        this.additionalData = additionalData;
        this.grades = gradesArr;

        if( this.grades.length === 0 )
            studentsArr.forEach( student => this.addNewGrade( student.id ));
    }

    addNewGrade( idStudent, score )
    {
        if( typeof idStudent !== "number" )
            throw TypeError("El método addNewGrade espera dos numbers como parámetros.");

        return this.grades.push( new Grade( idStudent, score ) ) - 1;
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