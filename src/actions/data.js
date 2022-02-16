import { actionTypes } from "../types/types";


export const setCourseAction = ( institution, group, course ) => (
    {
        type: actionTypes.data.setCourse,
        payload: {

            institution: institution,
            group: group,
            course: course,
        }
    }
);