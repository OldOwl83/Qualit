import { actionTypes } from "../types/types";

export const startLoading = () => ( 
    {
        type: actionTypes.ui.isLoading,
    }
);

export const stopLoading = () => (
    {
        type: actionTypes.ui.isNotLoading,
    }
);


export const setFormScreen = ( formComponent ) => (
    {
        type: actionTypes.ui.setFormScreen,
        payload: formComponent,
    }
);

export const unsetFormScreen = () => (
    {
        type: actionTypes.ui.unsetFormScreen,
    }
);


export const dataIsSaved = () => (
    {
        type: actionTypes.ui.dataSaved,
    }
);

export const dataIsUnsaved = () => (
    {
        type: actionTypes.ui.dataUnsaved,
    }
);