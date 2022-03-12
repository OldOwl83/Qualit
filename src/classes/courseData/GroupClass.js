import { Student } from "../studentData/StudentClass";
import { Course } from "./CourseClass";


export class Group
{
    constructor( name = '(sin nombre)', coursesArr = [], studentsArr = [] )
    {
        if( typeof name !== "string" || !Array.isArray( coursesArr ) || !Array.isArray( studentsArr ) )
            throw TypeError("Los objetos Group toman un string y dos array como parámetros.");

        this.group = name;
        this.courses = coursesArr;
        this.students = studentsArr;
    }

    addNewCourse( name, stagesArr )
    {
        for( const course of this.courses)
            if( course.course === name )
                throw Error( "Este curso ya existe." );
                
        return this.courses.push( new Course( name, stagesArr, this.students ) ) - 1;
    }

    updateCourseName( courseIndex, newName )
    {
        if( !newName )
            throw Error( 'El nombre es obligatorio.' );

        if( this.courses[ courseIndex ].course !== newName )
            for( const course of this.courses)
                if( course.course === newName )
                    throw Error("Este curso ya existe.");

        this.courses[ courseIndex ].course = newName;
    }

    deleteCourse( courseIndex, studentsArr )
    {
        this.courses.splice( courseIndex, 1 );
    }

    addNewStudent( lastName, firstName, additionalData )
    {
        const newStudent = new Student( lastName, firstName, additionalData );

        for( const student of this.students ) //Asignación automática de ID
            if( student.id >= newStudent.id )
                newStudent.assignID( student.id + 1);

        this.students.push( newStudent );

    //Ordenamiento alfabético
        this.students.sort( ( elem1, elem2 ) => {
            
            if( `${ elem1.lastName.toLowerCase() }${ elem1.firstName.toLowerCase() }` > `${ elem2.lastName.toLowerCase() }${ elem2.firstName.toLowerCase() }` )
                return 1;
            else
                return -1;
        } );

        for( let i = 0; i < this.courses.length; i++ )
            for( let j = 0; j < this.courses[i].stages.length; j++ )
                for( let k = 0; k < this.courses[i].stages[j].testGroups.length; k++ )
                    for( let l = 0; l < this.courses[i].stages[j].testGroups[k].tests.length; l++ )
                        this.courses[i].stages[j].testGroups[k].tests[l].addNewGrade( newStudent.id );

        return this.students.indexOf( newStudent );
    }

    updateStudentData( studentIndex, lastName, firstName, additionalData )
    {
        if( !lastName )
            throw Error( 'El apellido es obligatorio.' );

        this.students[ studentIndex ].lastName = lastName;
        this.students[ studentIndex ].firstName = firstName;
        this.students[ studentIndex ].additionalData = additionalData;

        //Ordenamiento alfabético
        this.students.sort( ( elem1, elem2 ) => {
            
            if( `${ elem1.lastName.toLowerCase() }${ elem1.firstName.toLowerCase() }` > `${ elem2.lastName.toLowerCase() }${ elem2.firstName.toLowerCase() }` )
                return 1;
            else
                return -1;
        } );
    }

    deleteStudent( studentIndex )
    {
        const idStudent = this.students[ studentIndex ].id;

        this.students.splice( studentIndex, 1 );

        for( let i = 0; i < this.courses.length; i++ )
            for( let j = 0; j < this.courses[i].stages.length; j++ )
                for( let k = 0; k < this.courses[i].stages[j].testGroups.length; k++ )
                    for( let l = 0; l < this.courses[i].stages[j].testGroups[k].tests.length; l++ )
                        this.courses[i].stages[j].testGroups[k].tests[l].deleteGrade( idStudent );
    }
}