export class Student
{
    constructor( id, lastName, firstName, gradesArr = [] )
    {
        if( typeof id !== "string" || typeof lastName !== "string" || typeof firstName !== "string" || !Array.isArray( gradesArr ) )
            throw TypeError( "Los objetos Student toman tres string y un array como parámetros." );

        if( !id )
            throw Error( "El parámetro ID es obligatorio." );

        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.grades = gradesArr;
    }

    addNewGrade( gradeObj )
    {
        for( const grade of this.grades)
            if( `${grade.course}${grade.stage}${grade.test}` === `${gradeObj.course}${gradeObj.stage}${gradeObj.test}` )
                throw Error( "Esta nota ya existe." );

        this.grades.push( gradeObj );
    }

    updateGradeProperties( gradeIndex, { newCourse, newStage, newTest } )
    {
        if( this.grades[ gradeIndex ].course === newCourse && this.grades[ gradeIndex ].stage === newStage && this.grades[ gradeIndex ].test === newTest )
            return;

        for( const grade of this.grades)
            if( `${grade.course}${grade.stage}${grade.test}` === `${gradeObj.course}${gradeObj.stage}${gradeObj.test}` )
                throw Error( "Esta nota ya existe." );

        this.grades[ gradeIndex ].course = newCourse;
        this.grades[ gradeIndex ].stage = newStage;
        this.grades[ gradeIndex ].test = newTest;
    }
}