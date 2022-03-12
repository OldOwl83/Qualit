import { Institution } from "./InstitutionClass";
import { Group } from "./GroupClass";
import { Course } from "./CourseClass";
import { Stage } from "./StageClass";
import { TestGroup } from "./TestGroupClass";
import { Test } from "./TestClass";
import { Student } from "../studentData/StudentClass";
import { Grade } from "../studentData/GradeClass";

export class Data
{
    constructor( institArr = [], activeCourse = { institution: -1, group: -1, course: -1 } )
    {
        if( !Array.isArray( institArr ) || typeof activeCourse !== 'object' )
            throw TypeError("El objeto Data toma un array y un objeto como parámetro.");

        this.institutions = institArr;
        this.activeCourse = activeCourse;
    }

    addNewInstitution( name, groupsArr )
    {
        for( const instit of this.institutions)
            if( instit.institution === name )
                throw Error("Esta institución ya existe.");

        return this.institutions.push( new Institution( name, groupsArr ) ) - 1;
    }

    updateInstitName( institIndex, newName )
    {
        if( !newName )
            throw Error( 'El nombre es obligatorio.' );

        if( this.institutions[ institIndex ].institution !== newName )
            for( const instit of this.institutions)
                if( instit.institution === newName )
                    throw Error("Esta institución ya existe.");

        this.institutions[ institIndex ].institution = newName;
    }

    deleteInstitution( institIndex )
    {
        this.institutions.splice( institIndex, 1 );
    }

    parseDataFromDB( dataFromDB = [] ) 
    {
        this.institutions = dataFromDB.institutions.map( instit => {
    
            const groups = instit.groups.map( group => {

                const students = group.students.map( student => {

                    return new Student( student.lastName, student.firstName, student.additionalData, student.id );
                });
    
                const courses = group.courses.map( course => {
    
                    const stages = course.stages.map( stage => {

                        const testGroups = stage.testGroups.map( tG => {

                            const tests = tG.tests.map( test => {

                                const grades = test.grades.map( grade => new Grade( grade.idStudent, grade.score ));
                                
                                return new Test( test.test, test.percentWeight, test.additionalData, grades );
                            });

                            return new TestGroup( tG.testGroup, tG.percentWeight, tests );
                        });

                        return new Stage( stage.stage, stage.percentWeight, testGroups );
                    }); 
    
                    return new Course( course.course, stages );
                });
    
                return new Group( group.group, courses, students );
            }); 
    
            return new Institution( instit.institution, groups );
        });

        this.activeCourse = dataFromDB.activeCourse;
    };
}