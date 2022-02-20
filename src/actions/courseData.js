import { doc, getDoc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";

import { db } from "../SDKs/firebase";

import { actionTypes } from "../types/types";
import { Data } from "../classes/courseData/DataClass";
import { startLoading, stopLoading } from "./ui";


export const addCourseAction = ( institution, group, course ) => (
    {
        type: actionTypes.data.addCourse,
        payload: {

            institution: institution,
            group: group,
            course: course,
        }
    }
);

export const updateCourseAction = ( dataLocation, newData ) => (
    {
        type: actionTypes.data.updateCourse,
        payload: {

            dataLocation: {
                instLoc: dataLocation.institution,
                groupLoc: dataLocation.group,
                courseLoc: dataLocation.course,
            },

            newData: {
                institution: newData.institution,
                group: newData.group,
                course: newData.course,
            }
        }
    }
);


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
                    timer: 1200
                  });
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