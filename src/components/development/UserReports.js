import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { addDoc, collection } from 'firebase/firestore';
import Swal from 'sweetalert2';

import { authentication, db } from '../../SDKs/firebase';
import { useForms } from '../../hooks/useForms';
import { formValidate } from '../../helpers/formValidate';
import { startLoading, stopLoading } from '../../actions/ui';
import { deleteUser, signInAnonymously } from 'firebase/auth';

export const UserReports = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ values, handleChangeValues ] = useForms( {
        sender: '',
        senderEmail: '',
        message: ''
    } );

    const { sender, senderEmail, message } = values;


    const handleMessageSending = async( e ) => {

        e.preventDefault();

        if( !authentication.currentUser )
            await signInAnonymously( authentication )
                .catch( err => console.log(err) );

        if( formValidate( { email: senderEmail } ))
        {
            dispatch( startLoading() );

            addDoc( collection( db, 'messages' ), values )
                .then( () => {

                    Swal.fire({
                        title: 'Envío exitoso',
                        text: 'Hemos recibido su mensaje. Muchas gracias por colaborar con el desarrollo de Qualit. Nos estaremos comunicando a la casilla indicada, de ser necesario.',
                        icon: 'success',
                        showClass: {
                          popup: 'animate__animated animate__backInDown'
                        },
                        hideClass: {
                          popup: 'animate__animated animate__backOutUp'
                        }
                    });
                })
                .catch( err => {

                    Swal.fire({
                        title: 'Envío fallido',
                        text: err,
                        icon: 'error',
                        showClass: {
                          popup: 'animate__animated animate__backInDown'
                        },
                        hideClass: {
                          popup: 'animate__animated animate__backOutUp'
                        }
                    });
                })
                .finally( () => {

                    if( authentication.currentUser.isAnonymous )
                        deleteUser( authentication.currentUser );

                    dispatch( stopLoading() );
                    navigate( '../' );
            });
        }
};


    return (

        <div className='whole-bg animate__animated animate__fadeIn'>
            <Link to={ '../' }>
                <h1 title='Ir a la página principal'>Qualit</h1>
            </Link>

            <form onSubmit={ handleMessageSending } className='forms' >

                <h3>Reporte para el desarrollador de Qualit</h3>

                <input 
                    type="text"
                    placeholder='Remitente...'
                    name="sender"
                    autoComplete='off'
                    value={ sender }
                    onChange={ handleChangeValues }
                />

                <input 
                    type="email"
                    placeholder='Email del remitente...'
                    name="senderEmail"
                    autoComplete='off'
                    required
                    value={ senderEmail }
                    onChange={ handleChangeValues }
                />

                <textarea
                    placeholder='Reporte'
                    name='message'
                    rows='3'
                    maxLength='200'
                    required
                    value={ message }
                    onChange={ handleChangeValues }
                ></textarea>

                <button type='submit' className='sendButton'>Enviar</button>

            </form>
        </div>
    );
}
