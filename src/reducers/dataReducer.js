import { actionTypes } from "../types/types";

import { Course } from "../classes/courseData/CourseClass";
import { Group } from "../classes/courseData/GroupClass";
import { Institution } from "../classes/courseData/InstitutionClass";
import { Data } from "../classes/courseData/DataClass";

const initialState = new Data();

export const dataReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case actionTypes.data.dataLoad:

            return action.payload;

        case actionTypes.data.fullDataErase:

            return initialState;

        case actionTypes.data.addCourse:
        
            for( let instit of state.institutions )
            {
                if( instit.institution === action.payload.institution )
                {
                    for( let group of instit.groups )
                    {
                        if( group.group === action.payload.group )
                        {
                            group.addNewCourse( new Course( action.payload.course ))
                            
                            return state;
                        }
                    }

                    instit.addNewGroup( new Group( action.payload.group, [ new Course( action.payload.course ) ] ) );

                    return state;
                }
            }

            state.addNewInstitution( new Institution( action.payload.institution, [ new Group( action.payload.group, [ new Course( action.payload.course ) ] ) ] ) );
            
            return state;

        case actionTypes.data.updateCourse:

            //Falta validar la no repetición de nombres de instituciones en el arreglo data.

            state.updateInstitName( action.payload.dataLocation.instLoc, action.payload.newData.institution );

            state.institutions[ action.payload.dataLocation.instLoc ].updateGroupName( action.payload.dataLocation.groupLoc, action.payload.newData.group );

            state.institutions[ action.payload.dataLocation.instLoc ].groups[ action.payload.dataLocation.groupLoc ].updateCourseName( action.payload.dataLocation.courseLoc, action.payload.newData.course );

            return state;


            case actionTypes.data.addStudent:
//jhgjhg
                return state;

    
        default:
            return state;
    }
};