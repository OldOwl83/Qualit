import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';
import 'animate.css';

import { useForms } from '../../hooks/useForms';
import { demoInit, login } from '../../actions/auth';


export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ values, handleChangeValues, resetValues ] = useForms( JSON.parse( process.env.REACT_APP_DEFAULT_USER ) );

    const { email, password } = values;


    const handleLogin = ( e ) => {

        e.preventDefault();

        dispatch( login( values ) );
        
        resetValues();
    };


    const handleDemoInit = () => {

        Swal.fire({
            title: 'Qualit DEMO',
            text: 'Acaba de iniciar una sesión de prueba de Qualit. Aquí encontrará algunos modelos representativos de lo que puede hacer con Qualit. Puede explorar todas las funcionalidades de la aplicación, pero tenga en cuenta que ninguno de los datos ingresados podrá guardarse de forma persistente.',
            icon: 'info',
            showClass: {
              popup: 'animate__animated animate__backInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__backOutUp'
            }
        });

        dispatch( demoInit() );
    };


    return (

        <div className='whole-bg animate__animated animate__fadeIn'>
            <Link to={ '../' }>
                <h1 title='Ir a la página principal'>Qualit</h1>
            </Link>

            <form onSubmit={ handleLogin } className='forms' >

                <h3>Acceso de usuario</h3>

                <input 
                    type="email"
                    placeholder='Email...'
                    name="email"
                    autoComplete='on'
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

                <Link to={ '../recovery' }>
                    <p className='link'>¿Olvidó su contraseña?</p>
                </Link>

                <button type='submit' className='sendButton'>Acceder</button>

                <Link to={ '../register' }>
                    <p className='link'>¿Aun no tiene una cuenta? Regístrese en Qualit</p>
                </Link>

                <button 
                    type='button' 
                    className='sendButton'
                    onClick={ handleDemoInit }
                >Probar Qualit sin registrarse</button>
            </form>
        </div>
    );
};
