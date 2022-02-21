import React from 'react'
import { useDispatch } from 'react-redux';

import Swal from 'sweetalert2';

import { useForms } from '../../../hooks/useForms'
import { unsetFormScreen } from '../../../actions/ui';
import { addStudentAction } from '../../../actions/studentData';

export const AddStudent = () => {

    const dispatch = useDispatch();

    const [ formValues, handleFormValues ] = useForms( { 

        lastName: '',
        firstName: '',
        additionalData: '',
    } );

    const { lastName, firstName, additionalData } = formValues;


    const handleAddStudent = ( e ) => {

        e.preventDefault();
                        
        try{
            dispatch( addStudentAction( lastName, firstName, additionalData ) );
        }catch( err )
        {
            Swal.fire({
                title: 'Error en el registro del/la estudiante',
                text: err,
                icon: 'error',
                showClass: {
                  popup: 'animate__animated animate__backInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__backOutUp'
                }
              });

              return;
        }

        dispatch( unsetFormScreen() );
    };


    return (
    
        <form onSubmit={ handleAddStudent } className='forms' >

            <i className="far fa-window-close" onClick={ () => dispatch( unsetFormScreen() ) }></i>

            <h3>Nuevo/a estudiante</h3>

            <input 
                type="text"
                placeholder="Apellido"
                name="lastName"
                autoComplete='off'
                autoFocus
                value={ lastName }
                onChange={ handleFormValues }
            />

            <input 
                type="text"
                placeholder="Nombre"
                name="firstName"
                autoComplete='off'
                value={ firstName }
                onChange={ handleFormValues }
                />

            <textarea
                placeholder='Datos adicionales'
                name='additionalData'
                rows='3'
                maxLength='200'
                value={ additionalData }
                onChange={ handleFormValues }
            ></textarea>

            <button type='submit' className='sendButton'>Añadir estudiante al curso</button>
        </form>
    )
}
