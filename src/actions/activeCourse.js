import { actionTypes } from "../types/types";

export const setActiveInstitution = ( institutionIndex ) => (
    {
        type: actionTypes.activeCourse.setActiveInstit,
        payload: institutionIndex,
    }
);

export const setActiveGroup = ( groupIndex ) => (
    {
        type: actionTypes.activeCourse.setActiveGroup,
        payload: groupIndex,
    }
);

export const setActiveCourse = ( courseIndex ) => (
    {
        type: actionTypes.activeCourse.setActiveCourse,
        payload: courseIndex,
    }
);