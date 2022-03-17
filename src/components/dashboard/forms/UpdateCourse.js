import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { useForms } from '../../../hooks/useForms'
import { unsetFormScreen } from '../../../actions/ui';
import { updateCourseAction } from '../../../actions/courseData';
import Swal from 'sweetalert2';

export const UpdateCourse = () => {

    const dispatch = useDispatch();

    const { institutions, activeCourse } = useSelector( state => state.data)

    const [ formValues, handleFormValues, formReset ] = useForms( { 

        institution: institutions[ activeCourse.institution ].institution,

        group: institutions[ activeCourse.institution ].groups[ activeCourse.group ].group,

        course: institutions[ activeCourse.institution ].groups[ activeCourse.group ].courses[ activeCourse.course ].course,
    } );

    const { institution, group, course } = formValues;


    const handleUpdateCourse = ( e ) => {

        e.preventDefault();
                        
        try{
            dispatch( updateCourseAction( { institution, group, course } ) );
        }catch( err )
        {
            Swal.fire({
                title: 'Error en la actualización del curso',
                text: err,
                icon: 'error',
                showClass: {
                  popup: 'animate__animated animate__backInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__backOutUp'
                }
              });

              formReset();

              return;
        }

        dispatch( unsetFormScreen() );
    };


    return (
    
        <form onSubmit={ handleUpdateCourse } className='forms' >

            <i className="far fa-window-close" onClick={ () => dispatch( unsetFormScreen() ) }></i>

            <h3>Editar curso</h3>

            <input 
                type="text"
                placeholder="Institución"
                name="institution"
                autoComplete='on'
                required
                autoFocus
                onFocus={ ( e ) => e.target.select() }
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
                    onFocus={ ( e ) => e.target.select() }
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
                    onFocus={ ( e ) => e.target.select() }
                    value={ course }
                    onChange={ handleFormValues }
                />

                <i 
                    className="fas fa-info-circle"
                    title='Nombre de la asignatura o propuesta educativa  ("Prácticas del Lenguaje", "Taller de Cine", "Leyendo a Platón", etc.)'
                ></i>
            </span>

            <button type='submit' className='sendButton'>Actualizar</button>
        </form>
    )
}
