export class Student
{
    constructor( lastName, firstName, additionalData, gradesArr = [], id = 0 )
    {
        if( typeof lastName !== "string" || typeof firstName !== "string" || typeof additionalData !== "string" || !Array.isArray( gradesArr ) )
            throw TypeError( "Los objetos Student toman tres string y un array como parámetros." );

        if( !lastName )
            throw Error( "El parámetro 'lastName' es obligatorio." );

        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.additionalData = additionalData;
        this.grades = gradesArr;
    }

    assignID( id )
    {
       this.id = id;
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
            if( `${grade.course}${grade.stage}${grade.test}` === `${newCourse}${newStage}${newTest}` )
                throw Error( "Esta nota ya existe." );

        this.grades[ gradeIndex ].course = newCourse;
        this.grades[ gradeIndex ].stage = newStage;
        this.grades[ gradeIndex ].test = newTest;
    }
}