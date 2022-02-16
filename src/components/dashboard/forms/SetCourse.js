import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { useForms } from '../../../hooks/useForms'
import { unsetFormScreen } from '../../../actions/ui';
import { setCourseAction } from '../../../actions/data';
import Swal from 'sweetalert2';

export const SetCourse = () => {

    const dispatch = useDispatch();

    const data = useSelector( state => state.data );

    const [ formValues, handleFormValues ] = useForms( { 

        institution: '',
        group: '',
        course: '',
    } );

    const { institution, group, course } = formValues;


    const handleSetCourse = ( e ) => {

        e.preventDefault();

        // for( let elem of data )
        //     if( elem.institution === institution )
        //         for( let grou of elem.groups )
        //             if( grou.group === group )
        //                 for( let cours of grou.courses )
        //                     if( cours.course === course )
        //                     {
        //                         Swal.fire({
        //                             title: 'Curso existente',
        //                             text: 'Ya existe un curso que coincide con los datos ingresados. Modifique los datos del nuevo curso o elimine el anterior.',
        //                             icon: 'error',
        //                             showClass: {
        //                               popup: 'animate__animated animate__backInDown'
        //                             },
        //                             hideClass: {
        //                               popup: 'animate__animated animate__backOutUp'
        //                             }
        //                           });

        //                           return;
                            // }
                        
        try{
            dispatch( setCourseAction( institution, group, course ) );
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
    
        <form onSubmit={ handleSetCourse } className='forms' >

            <i className="far fa-window-close" onClick={ () => dispatch( unsetFormScreen() ) }></i>

            <h3>Nueva planilla</h3>

            <input 
                type="text"
                placeholder={ "Institución" }
                name="institution"
                autoComplete='on'
                required
                value={ institution }
                onChange={ handleFormValues }
            />

            <input 
                type="text"
                placeholder={ "Grupo" }
                name="group"
                autoComplete='on'
                required
                value={ group }
                onChange={ handleFormValues }
            />

            <input 
                type="text"
                placeholder={ "Curso" }
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
