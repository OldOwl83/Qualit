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
    
                const students = group.students.map( student => {

                    return new Student( student.lastName, student.firstName, student.additionalData, student.id );
                });
    
                return new Group( group.group, courses, students );
            }); 
    
            return new Institution( instit.institution, groups );
        });

        this.activeCourse = dataFromDB.activeCourse;
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
        if( !newName )
            throw Error( 'El nombre es obligatorio.' );

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