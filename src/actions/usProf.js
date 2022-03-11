import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { authentication, db, storage } from "../SDKs/firebase";
import Swal from "sweetalert2";

import { actionTypes } from "../types/types";
import { startLoading, stopLoading } from "./ui";
import { updatePassword } from "firebase/auth";


export const getUserProfile = ( uid ) => {

    return async( dispatch ) => {

        dispatch( startLoading() );

        const userStore = await getDoc( doc( db, `users/${ uid }`));
    
        dispatch( updateUserProfileAction( userStore.data() ) );

        dispatch( stopLoading() );
    };
};

export const updateUserProfile = ( uid, userNewData) => {

    return async( dispatch ) => {

        dispatch( startLoading() );

        await setDoc( doc( db, 'users', uid ), userNewData )
            .then( () => {

                dispatch( updateUserProfileAction( userNewData ) );

                Swal.fire({
                    title: 'Actualización exitosa',
                    icon: 'success',
                    showClass: {
                      popup: 'animate__animated animate__backInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__backOutUp'
                    }
                });
            })
            .catch( ( err ) => {

                Swal.fire({
                    title: 'Actualización fallida',
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

export const updateUserPassword = ( password ) => {

    return async( dispatch ) => {

        dispatch( startLoading() );

        await updatePassword( authentication.currentUser, password )
            .catch( err => {

                Swal.fire({
                    title: 'La contraseña no pudo actualizarse',
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

export const uploadUserPhoto = ( uid, fileObject ) => {

    return async( dispatch ) => {

        dispatch( startLoading() );

        const storageRef = ref( storage, `profileImages/${ uid }${ fileObject.name }`);

        await uploadBytes( storageRef, fileObject )
            .catch( err => {
                
                Swal.fire({
                    title: 'Falló el guardado de la imagen',
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

export const updateUserProfileAction = ( newData = {} ) => (
    {
        type: actionTypes.usProf.updateData,
        payload: newData,
    }
);


export const deleteUserProfileAction = () => (
    {
        type: actionTypes.usProf.deleteData,
    }
);
