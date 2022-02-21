import React from 'react'
import { useDispatch } from 'react-redux';

import Swal from 'sweetalert2';

import { useForms } from '../../../hooks/useForms'
import { unsetFormScreen } from '../../../actions/ui';
import { addStageAction } from '../../../actions/courseData';

export const AddStage = () => {

    const dispatch = useDispatch();

    const [ formValues, handleFormValues ] = useForms( { 

        stage: '',
        percentWeight: '',
    } );

    const { stage, percentWeight } = formValues;


    const handleAddStage = ( e ) => {

        e.preventDefault();
                        
        try{
            dispatch( addStageAction( stage, percentWeight ) );
        }catch( err )
        {
            Swal.fire({
                title: 'Error en el registro de la etapa',
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
    
        <form onSubmit={ handleAddStage } className='forms' >

            <i className="far fa-window-close" onClick={ () => dispatch( unsetFormScreen() ) }></i>

            <h3>Nueva etapa</h3>

            <input 
                type="text"
                placeholder="Nombre de la etapa"
                name="stage"
                autoComplete='off'
                required
                value={ stage }
                onChange={ handleFormValues }
            />

            <input 
                type="text"
                placeholder="Incidencia porcentual en la calificación final"
                name="percentWeight"
                autoComplete='off'
                value={ percentWeight }
                onChange={ handleFormValues }
            />

            <button type='submit' className='sendButton'>Agregar etapa</button>
        </form>
    )
}
