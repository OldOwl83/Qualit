import { actionTypes } from "../types/types";

const initialState = {
    loading: false,
    formScreen: false,
    dataSaved: true,
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


        case actionTypes.ui.dataSaved:
            return (
                {
                    ...state,
                    dataSaved: true,
                }
            );

        case actionTypes.ui.dataUnsaved:
            return (
                {
                    ...state,
                    dataSaved: false,
                }
            );
    
        default:
            return state;
    }
};
 