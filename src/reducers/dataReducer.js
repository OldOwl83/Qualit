import { actionTypes } from "../types/types";

import { Course } from "../classes/courseData/CourseClass";
import { Group } from "../classes/courseData/GroupClass";
import { Institution } from "../classes/courseData/InstitutionClass";
import { Data } from "../classes/courseData/DataClass";
import { Student } from "../classes/studentData/studentClass";
import { Stage } from "../classes/courseData/StageClass";
import { TestGroup } from "../classes/courseData/TestGroupClass";

const initialState = new Data();

export const dataReducer = ( state = initialState, action ) => {

    let newState;

    switch ( action.type ) {

    //Establecimiento del curso activo
        case actionTypes.activeCourse.setActiveInstit:

            return new Data( state.institutions, {
                    ...state.activeCourse,
                    institution: action.payload,
                    group: 0,
                    course: 0,
            });

        case actionTypes.activeCourse.setActiveGroup:

            return new Data( state.institutions, {
                ...state.activeCourse,
                group: action.payload,
                course: 0,
            });

        case actionTypes.activeCourse.setActiveCourse:
            
            state.activeCourse.course = action.payload;

            return new Data( state.institutions, {
                ...state.activeCourse,
                course: action.payload,
            }); 
        
        case actionTypes.activeCourse.resetActives:

            return new Data( state.institutions, {
                ...state.activeCourse,
                institution: -1,
                group: -1,
                course: -1,
        });

    //Gestión de cursos
        case actionTypes.data.dataLoad:

            return action.payload;

        case actionTypes.data.fullDataErase:

            return initialState;


        case actionTypes.data.addCourse:

            newState = new Data( state.institutions, state.activeCourse );

            const { institutions, activeCourse } = newState;
        
            for( let i = 0; i < institutions.length; i++ )
            {
                if( institutions[i].institution === action.payload.institution )
                {
                    for( let j = 0; j < institutions[i].groups.length; j++ )
                    {
                        if( institutions[i].groups[j].group === action.payload.group )
                        {
                            institutions[i].groups[j].addNewCourse( new Course( action.payload.course ) )

                            activeCourse.institution = i;
                            activeCourse.group = j;
                            activeCourse.course = institutions[i].groups[j].courses.length - 1;
                            
                            return newState;
                        }
                    }

                    institutions[i].addNewGroup( new Group( action.payload.group, [ new Course( action.payload.course ) ] ) );

                    activeCourse.institution = i;
                    activeCourse.group = institutions[i].groups.length - 1;
                    activeCourse.course = 0;

                    return newState;
                }
            }

            newState.addNewInstitution( new Institution( action.payload.institution, [ new Group( action.payload.group, [ new Course( action.payload.course ) ] ) ] ) );

            activeCourse.institution = institutions.length - 1;
            activeCourse.group = 0;
            activeCourse.course = 0;
            
            return newState;

        case actionTypes.data.updateCourse:

            newState = new Data( state.institutions, state.activeCourse );

            newState.updateInstitName( state.activeCourse.institution, action.payload.institution );

            newState.institutions[ state.activeCourse.institution ].updateGroupName( state.activeCourse.group, action.payload.group );

            newState.institutions[ state.activeCourse.institution ].groups[ state.activeCourse.group ].updateCourseName( state.activeCourse.course, action.payload.course );

            return newState;

        case actionTypes.data.deleteCourse:

            newState = new Data( state.institutions );

            newState.institutions[ state.activeCourse.institution ].groups[ state.activeCourse.group ].deleteCourse( state.activeCourse.course );

            if( newState.institutions[ state.activeCourse.institution].groups[ state.activeCourse.group ].courses.length === 0 )
            {
                newState.institutions[ state.activeCourse.institution ].deleteGroup( state.activeCourse.group );

                if( newState.institutions[ state.activeCourse.institution].groups.length === 0 )
                    newState.deleteInstitution( state.activeCourse.institution );
            }

            return newState;


        //Gestión estudiantes
            case actionTypes.data.addStudent:

                newState = new Data( state.institutions, state.activeCourse );

                newState.institutions[ state.activeCourse.institution ].groups[ state.activeCourse.group ].addNewStudent( new Student( action.payload.lastName, action.payload.firstName, action.payload.additionalData ));

                return newState;

            case actionTypes.data.updateStudent:

                newState = new Data( state.institutions, state.activeCourse );

                newState.institutions[ state.activeCourse.institution ].groups[ state.activeCourse.group ].updateStudentData( action.payload.studentIndex, { 
                    lastName: action.payload.lastName,
                    firstName: action.payload.firstName,
                    additionalData: action.payload.additionalData } );

                return newState;

            case actionTypes.data.deleteStudent:

                newState = new Data( state.institutions, state.activeCourse );

                newState.institutions[ state.activeCourse.institution ].groups[ state.activeCourse.group ].deleteStudent( action.payload );

                return newState;

        //Gestión etapas
            case actionTypes.data.addStage:

                newState = new Data( state.institutions, state.activeCourse );

                newState.institutions[ state.activeCourse.institution ].groups[ state.activeCourse.group ].courses[ state.activeCourse.course].addNewStage( new Stage( action.payload.stage, Number( action.payload.percentWeight ) ) );

                return newState;

            case actionTypes.data.updateStage:

                newState = new Data( state.institutions, state.activeCourse );
                
                newState.institutions[ state.activeCourse.institution ].groups[ state.activeCourse.group ].courses[ state.activeCourse.course].updateStage( action.payload.stageIndex, action.payload.stage, Number( action.payload.percentWeight ) );

                return newState;

            case actionTypes.data.deleteStage:

                newState = new Data( state.institutions, state.activeCourse );
                
                newState.institutions[ state.activeCourse.institution ].groups[ state.activeCourse.group ].courses[ state.activeCourse.course].deleteStage( action.payload ); 

                return newState;

        //Gestión categorías
            case actionTypes.data.addTestGroup:

                newState = new Data( state.institutions, state.activeCourse );

                newState.institutions[ state.activeCourse.institution ].groups[ state.activeCourse.group ].courses[ state.activeCourse.course ].stages[ action.payload.stageIndex ].addNewTestGroup( new TestGroup( action.payload.testGroup, Number( action.payload.percentWeight ) ) );

                return newState;

            case actionTypes.data.updateTestGroup:

                newState = new Data( state.institutions, state.activeCourse );
                
                newState.institutions[ state.activeCourse.institution ].groups[ state.activeCourse.group ].courses[ state.activeCourse.course].stages[ action.payload.stageIndex ].updateTestGroup( action.payload.testGroupIndex, action.payload.testGroup, Number( action.payload.percentWeight ) );

                return newState;

            case actionTypes.data.deleteTestGroup:

                newState = new Data( state.institutions, state.activeCourse );
                
                newState.institutions[ state.activeCourse.institution ].groups[ state.activeCourse.group ].courses[ state.activeCourse.course].stages[ action.payload.stageIndex ].deleteTestGroup( action.payload.testGroupIndex ); 

                return newState;
    
        default:
            return state;
    }
};