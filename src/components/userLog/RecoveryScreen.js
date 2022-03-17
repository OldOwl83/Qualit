import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import 'animate.css';

import { useForms } from '../../hooks/useForms';
import { formValidate } from '../../helpers/formValidate';
import { recoveryPassword } from '../../actions/auth';


export const RecoveryScreen = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [ values, handleChangeValues ] = useForms( JSON.parse( process.env.REACT_APP_DEFAULT_USER ) );

    const { email } = values;


    const handlePasswordRecovery = async( e ) => {

        e.preventDefault();

        if( formValidate( {
            email: email,
        } ) )
        {
            await dispatch( recoveryPassword( email ) );
            navigate( '../login' );
        }
        
    }


    return (

        <div className='whole-bg animate__animated animate__fadeIn'>

            <Link to={ '../' }>
                <h1 title='Ir a la página principal'>Qualit</h1>
            </Link>
            
            <form onSubmit={ handlePasswordRecovery } className='forms' >

                <h3>Restablecimiento de contraseña</h3>

                <input 
                    type="email"
                    placeholder='Email...'
                    name="email"
                    autoComplete='on'
                    value={ email }
                    onChange={ handleChangeValues }
                />

                <button type='submit' className='sendButton'>Restablecer</button>

                <Link to={ '../login' }>
                    <p className='link'>Volver a la pantalla de acceso</p>
                </Link>

            </form>
        </div>
    );
};
