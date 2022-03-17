import React from 'react'
import { useDispatch } from 'react-redux';

import Swal from 'sweetalert2';

import { useForms } from '../../../hooks/useForms'
import { unsetFormScreen } from '../../../actions/ui';
import { addTestAction } from '../../../actions/courseData';
import { formValidate } from '../../../helpers/formValidate';


export const AddTest = ( { testGroupIndex, stageIndex } ) => {

    const dispatch = useDispatch();

    const [ formValues, handleFormValues ] = useForms( { 

        test: '',
        percentWeight: '',
        additionalData: '',
    } );

    const { test, percentWeight, additionalData } = formValues;


    const handleAddTest = ( e ) => {

        e.preventDefault();
                        
        try{
            if( formValidate( { percentWeight } ) )
                dispatch( addTestAction( test, percentWeight, additionalData, testGroupIndex, stageIndex ) );
        }catch( err )
        {
            Swal.fire({
                title: 'Error en el registro de la evaluación',
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
    
        <form onSubmit={ handleAddTest } className='forms' >

            <i className="far fa-window-close" onClick={ () => dispatch( unsetFormScreen() ) }></i>

            <h3>Nueva evaluación</h3>

            <input 
                type="text"
                placeholder="Evaluación"
                name="test"
                autoComplete='off'
                autoFocus
                value={ test }
                onChange={ handleFormValues }
            />

            <span>
                <input 
                    type="text"
                    placeholder="Incidencia porcentual en la categoría"
                    name="percentWeight"
                    autoComplete='off'
                    value={ percentWeight }
                    onChange={ handleFormValues }
                />

                <i 
                    className="fas fa-info-circle"
                    title='Indica el peso relativo de la evaluación en el promedio de la categoría, representado porcentualmente. La suma de las incidencias de todas las evaluaciones de la categoría no puede ser mayor al 100%. El conjunto de las evaluaciones cuya incidencia no se especifique, o se fije en 0, ocupará el porcentaje necesario para alcanzar el 100% del promedio de la categoría; y dentro de ese conjunto, todas las evaluaciones tendrán el mismo peso.'
                ></i>
            </span>

            <textarea
                placeholder='Datos adicionales'
                name='additionalData'
                rows='3'
                maxLength='200'
                value={ additionalData }
                onChange={ handleFormValues }
            ></textarea>

            <button type='submit' className='sendButton'>Añadir evaluación</button>
        </form>
    )
}
