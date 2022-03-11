import React from 'react';
import { useDispatch } from 'react-redux';

import 'animate.css';

import { useForms } from '../../hooks/useForms';
import { confirmRecoveryPassword } from '../../actions/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { formValidate } from '../../helpers/formValidate';


export const NewPasswordScreen = ( { recoveryCode }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [ values, handleChangeValues, resetValues ] = useForms( { password: '' } );

    const { password } = values;


    const handlePasswordChange = async( e ) => {

        e.preventDefault();

        if( formValidate( { password }) )
        {
            await dispatch( confirmRecoveryPassword( recoveryCode, password ) );

            navigate( '../../login' );
        }

        resetValues();
    };


    return (

        <div className='whole-bg'>
        <form onSubmit={ handlePasswordChange } className='forms animate__animated animate__fadeIn' >

            <h3>Nueva contraseña</h3>

            <input 
                type="password"
                placeholder='Nueva contraseña...'
                name="password"
                autoComplete='off'
                value={ password }
                onChange={ handleChangeValues }
            />

            <button type='submit' className='sendButton'>Confirmar</button>
        </form>
        </div>
    );
};
