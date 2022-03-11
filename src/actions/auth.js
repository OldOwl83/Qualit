import { applyActionCode, confirmPasswordReset, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { authentication, db } from "../SDKs/firebase";

import Swal from "sweetalert2";

import { actionTypes, dataTypes } from "../types/types";
import { doc, setDoc } from "firebase/firestore";
import { deleteUserProfileAction, getUserProfile, updateUserProfileAction } from "./usProf";
import { startLoading, stopLoading } from "./ui";
import { dataLoadAction, downloadData, fullDataEraseAction, uploadData } from "./courseData";
import { resetActiveCourse } from "./activeCourse";
import { Data } from "../classes/courseData/DataClass";
import { demoData, demoProfile } from "../data/demoData";


export const register = ( newUserData, setSuccess ) => {

    const { lastName, firstName, email, password } = newUserData;

    return async( dispatch ) => {

        dispatch( startLoading() );

        await createUserWithEmailAndPassword( authentication, email, password )
            .then( async( resp ) => {
                
                sendEmailVerification( resp.user, { 
                    url: process.env.REACT_APP_RECOVERY_CONTINUE_URL,
                    handleCodeInApp: true,
                } );
                
                await setDoc( doc( db, 'users', resp.user.uid ), {
                    lastName: lastName,
                    firstName: firstName,
                    email: email,
                    photo: '',
                });

                await dispatch( uploadData( new Data(), resp.user.uid ) );

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

                    await dispatch( downloadData( user.uid ) );

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
            .finally( () => {

                dispatch( fullDataEraseAction() );
                dispatch( resetActiveCourse() );
            });
    };
};

export const logoutAction = () => (
    {
        type: actionTypes.auth.logout,
    }
);


export const verifyEmail = ( code ) => {

    return async( dispatch ) => {

        dispatch( startLoading() );
        
        await applyActionCode( authentication, code )
            .then( () => {
                
                Swal.fire({
                    title: 'Casilla verificada',
                    text: 'Ya puede ingresar a su cuenta de Qualit.',
                    icon: 'success',
                    showClass: {
                      popup: 'animate__animated animate__backInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__backOutUp'
                    }
                });
            })
            .catch( err => { 
                
                Swal.fire({
                    title: 'Verificación fallida',
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

export const recoveryPassword = ( email ) => {

    return async( dispatch ) => {

        dispatch( startLoading() );
        
        await sendPasswordResetEmail( authentication, email, { 
            url: process.env.REACT_APP_RECOVERY_CONTINUE_URL,
            handleCodeInApp: true,
        } )
            .then( () => {
                
                Swal.fire({
                    title: 'Correo de restablecimiento enviado',
                    text: 'Busque el mensaje de Qualit en la casilla de correo declarada para proceder al restablecimiento de la contraseña.',
                    icon: 'info',
                    showClass: {
                    popup: 'animate__animated animate__backInDown'
                    },
                    hideClass: {
                    popup: 'animate__animated animate__backOutUp'
                    }
                });
            })
            .catch( err => { 
                
                Swal.fire({
                    title: 'Operación fallida',
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

export const confirmRecoveryPassword = ( recoveryCode, newPassword ) => {

    return async( dispatch ) => {

        dispatch( startLoading() );
        
        await confirmPasswordReset( authentication, recoveryCode, newPassword )
            .then( () => {
                
                Swal.fire({
                    title: 'Contraseña modificada con éxito',
                    icon: 'success',
                    showClass: {
                    popup: 'animate__animated animate__backInDown'
                    },
                    hideClass: {
                    popup: 'animate__animated animate__backOutUp'
                    }
                });
            })
            .catch( err => { 
                
                Swal.fire({
                    title: 'Operación fallida',
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


export const demoInit = () => {

    const data = new Data();
    data.parseDataFromDB( demoData );

    return ( dispatch ) => {

        dispatch( dataLoadAction( data ) );
        dispatch( updateUserProfileAction( demoProfile ) );
        dispatch( loginAction( dataTypes.demo.uid ) );
    };
};


export const demoExit = () => {

    return ( dispatch ) => {

        dispatch( logoutAction() );
    };
};