import React from 'react'
import { useDispatch } from 'react-redux';

import { useForms } from '../../../hooks/useForms'
import { unsetFormScreen } from '../../../actions/ui';

export const AddStudent = () => {

    const dispatch = useDispatch();

    const [ formValues, handleFormValues ] = useForms( { 

        id: '',
        lastName: '',
        firstName: '',
    } );

    const { id, lastName, firstName } = formValues;


    const handleAddStudent = ( e ) => {

        e.preventDefault();
                        
        try{
            dispatch( addStudentAction( id, lastName, firstName ) );
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
                placeholder="Identificación única"
                name="id"
                autoComplete='off'
                required
                value={ id }
                onChange={ handleFormValues }
            />

            <input 
                type="text"
                placeholder="Apellido"
                name="lastName"
                autoComplete='off'
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

                {/* <input 
                    type="file"
                    placeholder='Elija una foto'
                    name="photo"
                    autoComplete='off'
                    ref={ selectedPicture }
                /> */}

            <button type='submit' className='sendButton'>Añadir estudiante al curso</button>
        </form>
    )
}
