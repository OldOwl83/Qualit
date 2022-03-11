import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { unsetFormScreen } from '../../../actions/ui';
import { updateUserPassword, updateUserProfile, uploadUserPhoto } from '../../../actions/usProf';
import { useForms } from '../../../hooks/useForms';
import { formValidate } from '../../../helpers/formValidate';


export const ProfileUpdate = () => {

    const dispatch = useDispatch();

    const { usProf, auth } = useSelector( state => state );

    const [ formValues, handleChangeValues ] = useForms( { ...usProf, photo: '', password: '' } );

    const { lastName, firstName, photo, password } = formValues;

    const selectedPicture = useRef();


    const handleUpdateProfile = async( e ) => {

        e.preventDefault();

        let newData = { ...usProf, lastName, firstName };
        
        const file = selectedPicture.current.files[0];

        if( formValidate( { ...formValues, photo: file } ) )
        {
            if( file )
            {
                try
                {
                    await dispatch( uploadUserPhoto( auth.uid, file ));
                    newData = { ...newData, photo: `profileImages/${ auth.uid }${ file.name }` };

                }catch( err )
                {
                    return;
                };

            }

            if( password )
            {
                try
                {
                    await dispatch( updateUserPassword( password ));
                }catch( err )
                {
                    return;
                }
            }

            dispatch( updateUserProfile( auth.uid, newData ) );
        }
        
        dispatch( unsetFormScreen() );
    };
    
    
    return (
        <form onSubmit={ handleUpdateProfile } className='forms' >

            <i className="far fa-window-close" onClick={ () => dispatch( unsetFormScreen() ) }></i>

            <h3>Actualización de Perfil</h3>

            <input 
                type="text"
                placeholder={ lastName ? lastName : "Apellido" }
                name="lastName"
                autoComplete='off'
                value={ lastName }
                onChange={ handleChangeValues }
            />

            <input 
                type="text"
                placeholder={ firstName ? firstName : "Nombre" }
                name="firstName"
                autoComplete='off'
                value={ firstName }
                onChange={ handleChangeValues }
            />

            <label for='imgProfile'>
                {
                    `Nueva foto de perfil: ${ photo.slice( photo.lastIndexOf( '\\' ) + 1 ) }` 
                }
            </label>
            <input 
                type="file"
                id='imgProfile'
                name="photo"
                autoComplete='off'
                ref={ selectedPicture }
                value={ photo }
                onChange={ handleChangeValues }
            />

            <input 
                type="password"
                placeholder='Nueva contraseña...'
                autoComplete='off'
                name="password"
                id="password"
                value={ password }
                onChange={ handleChangeValues }
            />

            <button type='submit' className='sendButton'>Actualizar</button>
        </form>
    )
}
