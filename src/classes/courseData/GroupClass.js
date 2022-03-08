import { Grade } from "../studentData/GradeClass";

export class Group
{
    constructor( name, coursesArr = [], studentsArr = [] )
    {
        if( typeof name !== "string" || !Array.isArray( coursesArr ) || !Array.isArray( studentsArr ) )
            throw TypeError("Los objetos Group toman un string y dos array como parámetros.");

        this.group = name;
        this.courses = coursesArr;
        this.students = studentsArr;
    }

    addNewCourse( courseObj )
    {
        for( const course of this.courses)
            if( course.course === courseObj.course )
                throw Error( "Este curso ya existe." );
                
        this.courses.push( courseObj );
    }

    updateCourseName( courseIndex, newName )
    {
        if( !newName )
            throw Error( 'El nombre es obligatorio.' );

        if( this.courses[ courseIndex ].course === newName )
            return;

        for( const course of this.courses)
            if( course.course === newName )
                throw Error("Este curso ya existe.");

        this.courses[ courseIndex ].course = newName;
    }

    deleteCourse( courseIndex )
    {
        this.courses.splice( courseIndex, 1 );
    }

    addNewStudent( studentObj )
    {
        for( const student of this.students ) //Asignación automática de ID
            if( student.id >= studentObj.id )
                studentObj.assignID( student.id + 1);

        this.students.push( studentObj );
    //Ordenamiento alfabético
        this.students.sort( ( elem1, elem2 ) => {
            
            if( `${elem1.lastName}${elem1.firstName}` > `${elem2.lastName}${elem2.firstName}` )
                return 1;
            else
                return -1;
        } );

        for( let i = 0; i < this.courses.length; i++ )
            for( let j = 0; j < this.courses[i].stages.length; j++ )
                for( let k = 0; k < this.courses[i].stages[j].testGroups.length; k++ )
                    for( let l = 0; l < this.courses[i].stages[j].testGroups[k].tests.length; l++ )
                        this.courses[i].stages[j].testGroups[k].tests[l].grades.push( new Grade( studentObj.id ) );
    }

    updateStudentData( studentIndex, newData )
    {
        if( !newData.lastName )
            throw Error( 'El apellido es obligatorio.' );

        this.students[ studentIndex ].lastName = newData.lastName;
        this.students[ studentIndex ].firstName = newData.firstName;
        this.students[ studentIndex ].additionalData = newData.additionalData;
    }

    deleteStudent( studentIndex )
    {
        const idStudent = this.students[ studentIndex ].id;

        this.students.splice( studentIndex, 1 );

        for( let i = 0; i < this.courses.length; i++ )
            for( let j = 0; j < this.courses[i].stages.length; j++ )
                for( let k = 0; k < this.courses[i].stages[j].testGroups.length; k++ )
                    for( let l = 0; l < this.courses[i].stages[j].testGroups[k].tests.length; l++ )
                        this.courses[i].stages[j].testGroups[k].tests[l].grades = this.courses[i].stages[j].testGroups[k].tests[l].grades.filter( grade => grade.idStudent != idStudent );
    }
}