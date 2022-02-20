import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { useForms } from '../../../hooks/useForms'
import { unsetFormScreen } from '../../../actions/ui';
import { updateCourseAction } from '../../../actions/courseData';
import Swal from 'sweetalert2';

export const UpdateCourse = () => {

    const dispatch = useDispatch();

    const { data, activeCourse } = useSelector( state => state)

    const [ formValues, handleFormValues, formReset ] = useForms( { 

        institution: data.institutions[ activeCourse.institution ].institution,

        group: data.institutions[ activeCourse.institution ].groups[ activeCourse.group ].group,

        course: data.institutions[ activeCourse.institution ].groups[ activeCourse.group ].courses[ activeCourse.course ].course,
    } );

    const { institution, group, course } = formValues;


    const handleUpdateCourse = ( e ) => {

        e.preventDefault();
                        
        try{
            dispatch( updateCourseAction( { 
            
                institution: activeCourse.institution,
                group: activeCourse.group,
                course: activeCourse.course,
            
            }, { institution, group, course } ) );
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
                value={ institution }
                onChange={ handleFormValues }
            />

            <input 
                type="text"
                placeholder="Grupo"
                name="group"
                autoComplete='on'
                required
                value={ group }
                onChange={ handleFormValues }
            />

            <input 
                type="text"
                placeholder="Curso"
                name="course"
                autoComplete='off'
                required
                value={ course }
                onChange={ handleFormValues }
                />

                {/* <input 
                    type="file"
                    placeholder='Elija una foto'
                    name="photo"
                    autoComplete='off'
                    ref={ selectedPicture }
                /> */}

            <button type='submit' className='sendButton'>Agregar curso</button>
        </form>
    )
}
