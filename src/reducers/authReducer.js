import { actionTypes } from "../types/types";

const initialState = {
    uid: '',
    logged: false,
}


export const authReducer = ( state = initialState, action ) => {
  
    switch( action.type )
    {
        case actionTypes.auth.login:
            return (
                {
                    ...state,
                    uid: action.payload,
                    logged: true,
                }
            );

        case actionTypes.auth.logout:
            return initialState;


        default:

            return state;
    }
};
