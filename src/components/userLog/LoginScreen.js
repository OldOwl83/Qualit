import React from 'react';
import { useDispatch } from 'react-redux';

import 'animate.css';

import { useForms } from '../../hooks/useForms';
import { login } from '../../actions/auth';
import { Link } from 'react-router-dom';


export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ values, handleChangeValues, resetValues ] = useForms( JSON.parse( process.env.REACT_APP_DEFAULT_USER ) );

    const { email, password } = values;


    const handleLogin = ( e ) => {

        e.preventDefault();

        dispatch( login( values ) );
        
        resetValues();
    }

    return (

        <div className='whole-bg'>
        <form onSubmit={ handleLogin } className='forms animate__animated animate__fadeIn' >

            <h3>Acceso de usuario</h3>

            <input 
                type="email"
                placeholder='Email...'
                name="email"
                autoComplete='off'
                value={ email }
                onChange={ handleChangeValues }
            />

            <input 
                type="password"
                placeholder='Contraseña...'
                name="password"
                autoComplete='off'
                value={ password }
                onChange={ handleChangeValues }
            />

            <button type='submit' className='sendButton'>Acceder</button>

            <Link to={ '../register' }>
                <p className='link'>¿Aun no tiene una cuenta? Regístrese en Qualit</p>
            </Link>
        </form>
        </div>
    );
};
