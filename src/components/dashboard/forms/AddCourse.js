import React from 'react'
import { useDispatch } from 'react-redux';

import { useForms } from '../../../hooks/useForms'
import { unsetFormScreen } from '../../../actions/ui';
import { addCourseAction } from '../../../actions/courseData';
import Swal from 'sweetalert2';

export const AddCourse = () => {

    const dispatch = useDispatch();

    const [ formValues, handleFormValues ] = useForms( { 

        institution: '',
        group: '',
        course: '',
    } );

    const { institution, group, course } = formValues;


    const handleAddCourse = ( e ) => {

        e.preventDefault();
                        
        try{
            dispatch( addCourseAction( institution, group, course ) );
        }catch( err )
        {
            Swal.fire({
                title: 'Error en el registro del curso',
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
    
        <form onSubmit={ handleAddCourse } className='forms' >

            <i className="far fa-window-close" onClick={ () => dispatch( unsetFormScreen() ) }></i>

            <h3>Nuevo curso</h3>

            <input 
                type="text"
                placeholder="Institución"
                name="institution"
                autoComplete='on'
                required
                value={ institution }
                onChange={ handleFormValues }
            />

            <span>
                <input 
                    type="text"
                    placeholder="Grupo"
                    name="group"
                    autoComplete='on'
                    required
                    value={ group }
                    onChange={ handleFormValues }
                />
                <i 
                    className="fas fa-info-circle"
                    title='Designación del conjunto de personas a las que se asignarán las calificaciones ("1º año, 2ª división", "Formadores", "3ª cohorte", etc.)'
                ></i>
            </span>

            <span>
                <input 
                    type="text"
                    placeholder="Curso"
                    name="course"
                    autoComplete='off'
                    required
                    value={ course }
                    onChange={ handleFormValues }
                />

                <i 
                    className="fas fa-info-circle"
                    title='Nombre de la asignatura o propuesta educativa  ("Prácticas del Lenguaje", "Taller de Cine", "Leyendo a Platón", etc.)'
                ></i>
            </span>

            <button type='submit' className='sendButton'>Agregar curso</button>
        </form>
    )
}
