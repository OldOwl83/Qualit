import { actionTypes } from "../types/types";


export const setScoreAction = ( studentId, score, testIndex, testGroupIndex, stageIndex) => (
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