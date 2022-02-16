import { actionTypes } from "../types/types";

const initialState = {
    loading: false,
    formScreen: false,
}

export const uiReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case actionTypes.ui.isLoading:    
            return (
                {
                    ...state,
                    loading: true,
                }
            );

        case actionTypes.ui.isNotLoading:
            return (
                {
                    ...state,
                    loading: false,
                }
            );


        case actionTypes.ui.setFormScreen:
            return (
                {
                    ...state,
                    formScreen: action.payload,
                }
            );

        case actionTypes.ui.unsetFormScreen:
            return (
                {
                    ...state,
                    formScreen: false,
                }
            );
    
        default:
            return state;
    }
};
 