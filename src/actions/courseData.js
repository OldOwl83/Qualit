import { doc, getDoc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";

import { db } from "../SDKs/firebase";

import { actionTypes } from "../types/types";
import { Data } from "../classes/courseData/DataClass";
import { dataIsSaved, dataIsUnsaved, startLoading, stopLoading } from "./ui";


export const addCourseAction = ( institution, group, course ) => {

    return ( dispatch ) => {

        dispatch(
            {
                type: actionTypes.data.addCourse,
                payload: {
        
                    institution: institution,
                    group: group,
                    course: course,
                }
            }
        );

        dispatch( dataIsUnsaved() );
    };
};

export const updateCourseAction = ( newData ) => {
    
    return ( dispatch ) => {
    
        dispatch(
            {
                type: actionTypes.data.updateCourse,
                payload: {
                    institution: newData.institution,
                    group: newData.group,
                    course: newData.course,
                },
            }
        );
    
        dispatch( dataIsUnsaved() );
    };
}


export const deleteCourseAction = () => {

    return ( dispatch ) => {

        dispatch(
            {
                type: actionTypes.data.deleteCourse,
            }
        );

        dispatch( dataIsUnsaved() );
    };
};


export const addStageAction = ( name, percentWeight ) => {

    return ( dispatch ) => {

        dispatch(
            {
                type: actionTypes.data.addStage,
                payload: {
                    stage: name,
                    percentWeight: percentWeight,
                }
            }
        );

        dispatch( dataIsUnsaved() );
    };
};

export const updateStageAction = ( name, percentWeight, stageIndex ) => {

    return ( dispatch ) => {

        dispatch(
            {
                type: actionTypes.data.updateStage,
                payload: {
                    stage: name,
                    percentWeight,
                    stageIndex
                }
            }
        );

        dispatch( dataIsUnsaved() );
    };
};

export const deleteStageAction = ( stageIndex ) => {

    return ( dispatch ) => {

        dispatch(
            {
                type: actionTypes.data.deleteStage,
                payload: stageIndex
            }
        );

        dispatch( dataIsUnsaved() );
    };
};

export const addTestGroupAction = ( name, percentWeight, stageIndex ) => {

    return ( dispatch ) => {

        dispatch(
            {
                type: actionTypes.data.addTestGroup,
                payload: {
                    testGroup: name,
                    percentWeight,
                    stageIndex
                }
            }
        );

        dispatch( dataIsUnsaved() );
    };
};

export const updateTestGroupAction = ( name, percentWeight, testGroupIndex, stageIndex ) => {

    return ( dispatch ) => {

        dispatch(
            {
                type: actionTypes.data.updateTestGroup,
                payload: {
                    testGroup: name,
                    percentWeight,
                    testGroupIndex,
                    stageIndex,
                }
            }
        );

        dispatch( dataIsUnsaved() );
    };
};

export const deleteTestGroupAction = ( testGroupIndex, stageIndex ) => {

    return ( dispatch ) => {

        dispatch(
            {
                type: actionTypes.data.deleteTestGroup,
                payload: { testGroupIndex, stageIndex }
            }
        );

        dispatch( dataIsUnsaved() );
    };
};


export const addTestAction = ( name, percentWeight, additionalData, testGroupIndex, stageIndex ) => {

    return ( dispatch ) => {

        dispatch(
            {
                type: actionTypes.data.addTest,
                payload: {
                    test: name,
                    percentWeight,
                    additionalData,
                    testGroupIndex,
                    stageIndex 
                }
            }
        );

        dispatch( dataIsUnsaved() );
    };
};

export const updateTestAction = ( name, percentWeight, additionalData, testIndex, testGroupIndex, stageIndex ) => {

    return ( dispatch ) => {

        dispatch(
            {
                type: actionTypes.data.updateTest,
                payload: {
                    test: name,
                    percentWeight,
                    additionalData,
                    testIndex,
                    testGroupIndex,
                    stageIndex 
                }
            }
        );

        dispatch( dataIsUnsaved() );
    };
};

export const deleteTestAction = ( testIndex, testGroupIndex, stageIndex ) => {

    return ( dispatch ) => {

        dispatch(
            {
                type: actionTypes.data.deleteTest,
                payload: { testIndex, testGroupIndex, stageIndex }
            }
        );

        dispatch( dataIsUnsaved() );
    };
};


export const uploadData = ( data, uid ) => {

    return async( dispatch ) => {

        dispatch( startLoading() );

        await setDoc( doc( db, `users/${ uid }/data/mainData` ), { data: JSON.stringify( data ) } )
            .then( () => {

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Cambios guardados',
                    showConfirmButton: false,
                    timer: 1000
                  });

                dispatch( dataIsSaved() );
            })
            .catch( ( err ) => {

                Swal.fire({
                    title: 'Error al guardar cambios',
                    text: err.message,
                    icon: 'error',
                    showClass: {
                      popup: 'animate__animated animate__backInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__backOutUp'
                    }
                });
            });

        dispatch( stopLoading() );
    }
};

export const downloadData = ( uid ) => {

    return async( dispatch ) => {

        dispatch( startLoading() );

        await getDoc( doc( db, `users/${ uid }/data/mainData` ) )
            .then( snap => {

                const data = new Data();

                data.parseDataFromDB( JSON.parse( snap.data().data ) );

                dispatch( dataLoadAction( data ) );
                dispatch( dataIsSaved() );
            })
            .catch( err => {

                Swal.fire({
                    title: 'Error en el acceso a datos',
                    text: err.message,
                    icon: 'error',
                    showClass: {
                        popup: 'animate__animated animate__backInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__backOutUp'
                    }
                });
            });

        dispatch( stopLoading() );
    };
};

export const dataLoadAction = ( data ) => (
    {
        type: actionTypes.data.dataLoad,
        payload: data,
    }
);

export const fullDataEraseAction = () => (
    {
        type: actionTypes.data.fullDataErase,
    }
);