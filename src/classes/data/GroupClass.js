export class Group
{
    constructor( name, coursesArr = [], studentsArr = [] )
    {
        this.group = name;
        this.courses = coursesArr;
        this.students = studentsArr;
    }

    addNewCourse( courseObj )
    {
        for( let course of this.courses)
            if( course.course === courseObj.course )
                throw "Este curso ya existe.";
                
        this.courses.push( courseObj );
    }

    addNewStudent( studentObj )
    {
        this.students.push( studentObj );
    }
}