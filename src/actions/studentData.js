import { actionTypes } from "../types/types";
import { dataIsUnsaved } from "./ui";


export const addStudentAction = ( lastName, firstName, additionalData ) => {

    return ( dispatch ) => {

        dispatch(
            {
                type: actionTypes.data.addStudent,
                payload: {
                    lastName, firstName, additionalData
                },
            }
        );

        dispatch( dataIsUnsaved() );
    };
};

export const updateStudentAction = ( lastName, firstName, additionalData, studentIndex ) => {

    return ( dispatch ) => {

        dispatch(
            {
                type: actionTypes.data.updateStudent,
                payload: {
                    lastName, firstName, additionalData, studentIndex,
                },
            }
        );

        dispatch( dataIsUnsaved() );
    };
};

export const deleteStudentAction = ( studentIndex ) => {

    return ( dispatch ) => {

        dispatch(
            {
                type: actionTypes.data.deleteStudent,
                payload: studentIndex,
            }
        );

        dispatch( dataIsUnsaved() );
    };
};