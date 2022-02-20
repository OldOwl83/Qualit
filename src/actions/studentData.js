import { actionTypes } from "../types/types";


export const addStudentAction = ( id, lastName, firstName ) => (
    {
        type: actionTypes.data.addStudent,
        payload: {
            id, lastName, firstName,
        },
    }
);