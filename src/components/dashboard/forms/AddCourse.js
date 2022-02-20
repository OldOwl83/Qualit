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
