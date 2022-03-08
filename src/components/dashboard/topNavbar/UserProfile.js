import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getDownloadURL, ref } from 'firebase/storage';
import Swal from 'sweetalert2';

import { logout } from '../../../actions/auth';
import { setFormScreen, startLoading, stopLoading } from '../../../actions/ui';
import { storage } from '../../../SDKs/firebase';
import { ProfileUpdate } from '../forms/ProfileUpdate';

export const UserProfile = () => {

    const dispatch = useDispatch();
    const { usProf, ui } = useSelector( state => state );

    const { lastName, firstName, photo } = usProf;
    const { dataSaved } = ui;

    const [ urlPhoto, setUrlPhoto ] = useState( '' );


    const handleProfile = () => {

        dispatch( setFormScreen( <ProfileUpdate /> ) );
    };


    const handleLogout = async() => {

        if( !dataSaved )
        {
            await Swal.fire({
                title: 'Hay cambios sin guardar',
                text: '¿Está seguro/a de que desea cerrar sesión? Los cambios no guardados se perderán.',
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Cerrar sesión',
                focusCancel: true,
                showClass: {
                    popup: 'animate__animated animate__backInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__backOutUp'
                }
                })
                .then( result => {

                    if( result.isConfirmed )
                    {
                        dispatch( logout() );
                    }
                });
        }else
            dispatch( logout() );
    };


    useEffect( () => {

        if( photo )
        {
            dispatch( startLoading() );

            getDownloadURL( ref( storage, photo ) )
                .then( url => {
    
                    setUrlPhoto( url );
                })
                .catch( err => { console.log( err ); });
            
            dispatch( stopLoading() );
        }

    }, [ setUrlPhoto, photo, dispatch ]);


    return (

        // ( !photo || urlPhoto ) &&
        
        <div id="userProfile"> 
            
            <div id="imageProfile">

                { !photo ? 
                <i className="fas fa-user-circle"></i> :
                <img src={ urlPhoto } alt="Perfil de usuario" /> }

            </div>

            <p>{ `${ firstName } ${ lastName }` }</p>

            <div className='buttonsContainer'>
                <button onClick={ handleProfile }>Editar perfil</button>
                <button onClick={ handleLogout }>Cerrar sesión</button>
            </div>

        </div>
    )
}
