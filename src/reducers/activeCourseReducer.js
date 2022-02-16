import { actionTypes } from "../types/types";

const initialState = {
    institution: -1,
    group: -1,
    course: -1,
}

export const activeCourseReducer = ( state = initialState, action ) => {
  
    switch( action.type )
    {
        case actionTypes.activeCourse.setActiveInstit:
            return (
                {
                    ...state,
                    institution: action.payload,
                    group: 0,
                    course: 0,
                }
            );

        case actionTypes.activeCourse.setActiveGroup:
            return (
                {
                    ...state,
                    group: action.payload,
                    course: 0,
                }
            );

        case actionTypes.activeCourse.setActiveCourse:
            return (
                {
                    ...state,
                    course: action.payload,
                }
            );


        default:

            return state;
    }
};