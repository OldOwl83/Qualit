import React from 'react'
import { useDispatch } from 'react-redux';

import Swal from 'sweetalert2';

import { useForms } from '../../../hooks/useForms'
import { unsetFormScreen } from '../../../actions/ui';
import { addStageAction } from '../../../actions/courseData';
import { formValidate } from '../../../helpers/formValidate';

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

            if( formValidate( { percentWeight } ) )
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
                autoFocus
                required
                value={ stage }
                onChange={ handleFormValues }
            />

            <span>
                <input 
                    type="text"
                    placeholder="Incidencia porcentual en el promedio final"
                    name="percentWeight"
                    autoComplete='off'
                    value={ percentWeight }
                    onChange={ handleFormValues }
                />

                <i 
                    className="fas fa-info-circle"
                    title='Indica el peso relativo de la etapa en el "promedio final", representado porcentualmente. La suma de las incidencias de todas las etapas no puede ser mayor al 100%. El conjunto de las etapas cuya incidencia no se especifique, o se fije en 0, ocupará el porcentaje necesario para alcanzar el 100% del promedio total; y dentro de ese conjunto, todas las etapas tendrán el mismo peso.'
                ></i>
            </span>

            <button type='submit' className='sendButton'>Agregar etapa</button>
        </form>
    )
}
