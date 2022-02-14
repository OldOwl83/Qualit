import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { unsetFormScreen } from '../../../actions/ui';
import { updateUserProfile, uploadUserPhoto } from '../../../actions/usProf';
import { useForms } from '../../../hooks/useForms';
import { formValidate } from '../../../helpers/formValidate';


export const ProfileUpdate = () => {

    const dispatch = useDispatch();

    const { usProf, auth } = useSelector( state => state );

    const [ formValues, handleChangeValues ] = useForms( usProf );

    const { lastName, firstName } = formValues;

    const selectedPicture = useRef();


    const handleUpdateProfile = async( e ) => {

        e.preventDefault();

        let newData = { ...usProf, ...formValues };
        
        const file = selectedPicture.current.files[0];

        if( formValidate( { ...formValues, photo: file } ) )
        {
            if( file )
            {
                await dispatch( uploadUserPhoto( auth.uid, file ));

                newData = { ...newData, photo: `profileImages/${ auth.uid }${ file.name }` };
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
                placeholder={ lastName }
                name="lastName"
                id="lastName"
                value={ lastName }
                onChange={ handleChangeValues }
            />

            <input 
                type="text"
                placeholder={ firstName }
                name="firstName"
                id="firstName"
                value={ firstName }
                onChange={ handleChangeValues }
            />

            <input 
                type="file"
                placeholder='Elija una foto'
                name="photo"
                id="photo"
                ref={ selectedPicture }
            />

            {/* <input 
                type="password"
                placeholder='Contraseña...'
                autoComplete='off'
                name="password"
                id="password"
                value={ password }
                onChange={ handleChangeValues }
            /> */}

            <button type='submit' className='sendButton'>Actualizar</button>
        </form>
    )
}
