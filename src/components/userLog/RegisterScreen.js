import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Swal from 'sweetalert2';
import 'animate.css';

import { useForms } from '../../hooks/useForms';
import { formValidate } from '../../helpers/formValidate';
import { register } from '../../actions/auth';


export const RegisterScreen = () => {

    const [ registerSuccess, setRegisterSuccess ] = useState( false );

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [ values, handleChangeValues, resetValues ] = useForms( JSON.parse( process.env.REACT_APP_DEFAULT_USER ) );

    const { lastName, firstName, email, password } = values;


    const handleRegister = ( e ) => {

        e.preventDefault();

        if( formValidate( {
            lastName: lastName,
            firstName: firstName,
            email: email,
            password: password,
        } ) )
        {
            dispatch( register( values, setRegisterSuccess ) );
        }
        
        resetValues();
    }

    useEffect( () => {

        if( registerSuccess )
            {
                Swal.fire({
                    title: 'Registro exitoso',
                    text: 'Busque el correo de verificación en su casilla de registro.',
                    icon: 'success',
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'Aceptar',
                    showClass: {
                        popup: 'animate__animated animate__backInDown'
                      },
                      hideClass: {
                        popup: 'animate__animated animate__backOutUp'
                      },
                }).then(() => {
                
                    navigate('../login');
                })
            }
    }, [ registerSuccess, navigate ] );
    

    return (

        <div className='whole-bg animate__animated animate__fadeIn'>

            <Link to={ '../' }>
                <h1 title='Ir a la página principal'>Qualit</h1>
            </Link>

            <form onSubmit={ handleRegister } className='forms' >

                <h3>Registro de usuario</h3>

                <input 
                    type="text"
                    placeholder='Apellido...'
                    name="lastName"
                    autoComplete='off'
                    value={ lastName }
                    onChange={ handleChangeValues }
                />

                <input 
                    type="text"
                    placeholder='Nombres...'
                    name="firstName"
                    autoComplete='off'
                    value={ firstName }
                    onChange={ handleChangeValues }
                />

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

                <button type='submit' className='sendButton'>Enviar</button>

                <Link to={ '../login' }>
                    <p className='link'>¿Ya tiene una cuenta? Ingrese a Qualit</p>
                </Link>
            </form>
        </div>
    );
};
