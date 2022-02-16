import { actionTypes } from "../types/types";

import { Course } from "../classes/data/CourseClass";
import { Group } from "../classes/data/GroupClass";
import { Institution } from "../classes/data/InstitutionClass";

const initialState = [];

export const dataReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case actionTypes.data.setCourse:
        
            for( let instit of state )
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

            return (
                [
                    ...state,
                    new Institution( action.payload.institution, [ new Group( action.payload.group, [ new Course( action.payload.course ) ] ) ] )
                ]
            );

    
        default:
            return state;
    }
};