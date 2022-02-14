import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { authentication, db } from "../SDKs/firebase";

import Swal from "sweetalert2";

import { actionTypes } from "../types/types";
import { doc, setDoc } from "firebase/firestore";
import { deleteUserProfileAction, getUserProfile } from "./usProf";
import { startLoading, stopLoading } from "./ui";


export const register = ( newUserData, setSuccess ) => {

    const { lastName, firstName, email, password } = newUserData;

    return async( dispatch ) => {

        dispatch( startLoading() );

        await createUserWithEmailAndPassword( authentication, email, password )
            .then( async( resp ) => {
                
                sendEmailVerification( resp.user );
                
                await setDoc( doc( db, 'users', resp.user.uid ), {
                    lastName: lastName,
                    firstName: firstName,
                    email: email,
                    photo: '',
                });

                dispatch( logout() );

                setSuccess( true );
            })
            .catch( err => { 
                
                Swal.fire({
                    title: 'Registro fallido',
                    text: err.message,
                    icon: 'error',
                    showClass: {
                      popup: 'animate__animated animate__backInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__backOutUp'
                    }
                });
            })

        dispatch( stopLoading() );
    };
};


export const login = ( loginData ) => {

    const { email, password } = loginData;
    
    return async( dispatch ) => {

        dispatch( startLoading() );
        
        await signInWithEmailAndPassword( authentication, email, password )
            .then( async( { user } ) => {
                
                if( user.emailVerified )
                {
                    await dispatch( getUserProfile( user.uid ) );

                    dispatch( loginAction( user.uid ) );
                }else
                {
                    Swal.fire({
                        title: 'Cuenta no verificada',
                        text: 'Busque el mensaje de Qualit en la casilla de correo declarada para confirmar la validez de la misma',
                        icon: 'error',
                        showClass: {
                        popup: 'animate__animated animate__backInDown'
                        },
                        hideClass: {
                        popup: 'animate__animated animate__backOutUp'
                        }
                    });
                }
            })
            .catch( err => { 
                
                Swal.fire({
                    title: 'Acceso fallido',
                    text: err.message,
                    icon: 'error',
                    showClass: {
                        popup: 'animate__animated animate__backInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__backOutUp'
                    }
                });
            })

        dispatch( stopLoading() );
    };
};


export const loginAction = ( uid ) => (
    {
        type: actionTypes.auth.login,
        payload: uid,
    }
);


export const logout = () => {

    return ( dispatch ) => {

        signOut( authentication )
            .then( () => {
    
                dispatch( logoutAction() );
                dispatch( deleteUserProfileAction() );
            })
            .catch( ( err ) => {
                Swal.fire({
                    title: 'La sesión no ha podido cerrarse correctamente',
                    text: err.message,
                    icon: 'error',
                    showClass: {
                      popup: 'animate__animated animate__backInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__backOutUp'
                    }
                });
            })
    };
};

export const logoutAction = () => (
    {
        type: actionTypes.auth.logout,
    }
);