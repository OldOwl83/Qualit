import { actionTypes } from "../types/types";
import { dataIsUnsaved } from "./ui";


export const setScoreAction = ( studentId, score, testIndex, testGroupIndex, stageIndex) => {

    return ( dispatch ) => {

        dispatch(
            {
                type: actionTypes.data.setScore,
                payload: {
                    studentId,
                    score, 
                    testIndex, 
                    testGroupIndex, 
                    stageIndex
                }
            }
        );

        dispatch( dataIsUnsaved() );
    };
};