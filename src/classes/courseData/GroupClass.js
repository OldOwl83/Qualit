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
        this.students.push( studentObj );
    }

}