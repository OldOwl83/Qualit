import { actionTypes } from "../types/types";


export const addStudentAction = ( lastName, firstName, additionalData ) => (
    {
        type: actionTypes.data.addStudent,
        payload: {
            lastName, firstName, additionalData
        },
    }
);

export const updateStudentAction = ( lastName, firstName, additionalData, studentIndex ) => (
    {
        type: actionTypes.data.updateStudent,
        payload: {
            lastName, firstName, additionalData, studentIndex,
        },
    }
);