import { Student } from "../studentData/studentClass";
import { Course } from "./CourseClass";
import { Group } from "./GroupClass";
import { Institution } from "./InstitutionClass";

export class Data
{
    constructor( institArr = [], activeCourse = { institution: -1, group: -1, course: -1 } )
    {
        if( !Array.isArray( institArr ) )
            throw TypeError("El objeto Data toma un array como parámetro.");

        this.institutions = institArr;
        this.activeCourse = activeCourse;
    }

    parseDataFromDB( dataFromDB = [] ) 
    {

        this.institutions = dataFromDB.institutions.map( instit => {
    
            const groups = instit.groups.map( group => {
    
                const courses = group.courses.map( course => {
    
                    const stages = []; //Continuar con el mapeo de stages
    
                    return new Course( course.course, stages );
                });
    
                const students = group.students.map( student => {

                    const grades = []; //TODO: Mapeo de notas

                    return new Student( student.lastName, student.firstName, student.additionalData, grades, student.id );
                });
    
                return new Group( group.group, courses, students );
            }); 
    
            return new Institution( instit.institution, groups );
        });
    };

    addNewInstitution( institObj )
    {
        for( const instit of this.institutions)
            if( instit.institution === institObj.institution )
                throw Error("Esta institución ya existe.");

        this.institutions.push( institObj );
    }

    updateInstitName( institIndex, newName )
    {
        if( this.institutions[ institIndex ].institution === newName )
            return;

        for( const instit of this.institutions)
            if( instit.institution === newName )
                throw Error("Esta institución ya existe.");

        this.institutions[ institIndex ].institution = newName;
    }

    deleteInstitution( institIndex )
    {
        this.institutions.splice( institIndex, 1 );
    }
}