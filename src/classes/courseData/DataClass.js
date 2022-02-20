import { Course } from "./CourseClass";
import { Group } from "./GroupClass";
import { Institution } from "./InstitutionClass";

export class Data
{
    constructor( institArr = [] )
    {
        if( !Array.isArray( institArr ) )
            throw TypeError("El objeto Data toma un array como parámetro.");

        this.institutions = institArr;
    }

    parseDataFromDB( dataFromDB = [] ) 
    {

        this.institutions = dataFromDB.institutions.map( instit => {
    
            const groups = instit.groups.map( group => {
    
                const courses = group.courses.map( course => {
    
                    const stages = []; //Continuar con el mapeo de stages
    
                    return new Course( course.course, stages );
                });
    
                const students = []; //Continuar con el mapeo de students
    
                return new Group( group.group, courses, students );
            }); 
    
            return new Institution( instit.institution, groups );
        });
    };

    addNewInstitution( institObj )
    {
        for( let instit of this.institutions)
            if( instit.institution === institObj.institution )
                throw Error("Esta institución ya existe.");

        this.institutions.push( institObj );
    }

    updateInstitName( institIndex, newName )
    {
        if( this.institutions[ institIndex ].institution === newName )
            return;

        for( let instit of this.institutions)
            if( instit.institution === newName )
                throw Error("Esta institución ya existe.");

        this.institutions[ institIndex ].institution = newName;
    }
}