import { actionTypes } from "../types/types";

const initialState = {

    lastName: '',
    firstName: '',
    email: '',
    photo: '',
}


export const userProfileReducer = ( state = initialState, action ) => {
  
    switch( action.type )
    {
        case actionTypes.usProf.updateData:
            return {
                ...state,
                ...action.payload,
            };

        case actionTypes.usProf.deleteData:
            return initialState;
        

        default:

            return state;
    }
};
