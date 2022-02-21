import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';

import { unsetFormScreen } from '../../../actions/ui';
import { useForms } from '../../../hooks/useForms';
import { deleteStudentAction, updateStudentAction } from '../../../actions/studentData';

export const UpdateStudent = ( { studentIndex } ) => {
    
    const dispatch = useDispatch();

    const { institutions, activeCourse } = useSelector( state => state.data );

    const student = institutions[ activeCourse.institution ].groups[ activeCourse.group ].students[ studentIndex ];

    const [ formValues, handleFormValues ] = useForms( { 

        lastName: student.lastName,
        firstName: student.firstName,
        additionalData: student.additionalData,
    } );

    const { lastName, firstName, additionalData } = formValues;


    const handleUpdateStudent = ( e ) => {

        e.preventDefault();

        try{
            dispatch( updateStudentAction( lastName, firstName, additionalData, studentIndex ) );
        }catch( err )
        {
            Swal.fire({
                title: 'Error en la actualización del/la estudiante',
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

    const handleDeleteStudent = () => {
        
        Swal.fire({
            title: `¿Está seguro/a que desea eliminar al/a estudiante "${institutions[activeCourse.institution].groups[activeCourse.group].students[studentIndex].lastName}"?`,
            text: 'Si guarda los cambios, se perderán sus datos de manera definitiva.',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Aceptar',
            focusCancel: true,
            showClass: {
                popup: 'animate__animated animate__backInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__backOutUp'
            }
            })
            .then( result => {

                if( result.isConfirmed )
                {
                    dispatch( deleteStudentAction( studentIndex ) );
                    
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Estudiante eliminado/a',
                        showConfirmButton: false,
                        timer: 1000
                        });

                    dispatch( unsetFormScreen() );
                }
            });
    };


    return (
    
        <form onSubmit={ handleUpdateStudent } className='forms' >

            <i className="far fa-window-close" onClick={ () => dispatch( unsetFormScreen() ) }></i>

            <h3>Editar estudiante</h3>

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

            <div id="buttonsContainer">
                <button type='submit' className='sendButton'>Actualizar datos</button>
                <i className="fas fa-trash-alt" title="Eliminar estudiante" onClick={ handleDeleteStudent }></i>
            </div>
        </form>
    )
}
