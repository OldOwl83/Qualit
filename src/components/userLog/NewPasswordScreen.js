import React from 'react';
import { useDispatch } from 'react-redux';

import 'animate.css';

import { useForms } from '../../hooks/useForms';
import { confirmRecoveryPassword } from '../../actions/auth';
import { Link, useNavigate } from 'react-router-dom';
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

        <div className='whole-bg animate__animated animate__fadeIn'>

            <Link to={ '../' }>
                <h1 title='Ir a la página principal'>Qualit</h1>
            </Link>

            <form onSubmit={ handlePasswordChange } className='forms' >

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
