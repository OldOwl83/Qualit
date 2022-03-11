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

        <div className='whole-bg'>
        <form onSubmit={ handlePasswordRecovery } className='forms animate__animated animate__fadeIn' >

            <h3>Restablecimiento de contraseña</h3>

            <input 
                type="email"
                placeholder='Email...'
                name="email"
                autoComplete='off'
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
