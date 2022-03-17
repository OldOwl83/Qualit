import React from 'react'
import { useDispatch } from 'react-redux';

import Swal from 'sweetalert2';

import { useForms } from '../../../hooks/useForms'
import { unsetFormScreen } from '../../../actions/ui';
import { addTestGroupAction } from '../../../actions/courseData';
import { formValidate } from '../../../helpers/formValidate';


export const AddTestGroup = ( { stageIndex } ) => {

    const dispatch = useDispatch();

    const [ formValues, handleFormValues ] = useForms( { 

        testGroup: '',
        percentWeight: '',
    } );

    const { testGroup, percentWeight } = formValues;


    const handleAddTestGroup = ( e ) => {

        e.preventDefault();
                        
        try{
            if( formValidate( { percentWeight } ) )
                dispatch( addTestGroupAction( testGroup, percentWeight, stageIndex ) );
        }catch( err )
        {
            Swal.fire({
                title: 'Error en el registro de la categoría',
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
    
        <form onSubmit={ handleAddTestGroup } className='forms' >

            <i className="far fa-window-close" onClick={ () => dispatch( unsetFormScreen() ) }></i>

            <h3>Nueva etapa</h3>

            <input 
                type="text"
                placeholder="Nombre de la categoría"
                name="testGroup"
                autoComplete='off'
                autoFocus
                required
                value={ testGroup }
                onChange={ handleFormValues }
            />

            <span>
                <input 
                    type="text"
                    placeholder="Incidencia porcentual en la etapa"
                    name="percentWeight"
                    autoComplete='off'
                    value={ percentWeight }
                    onChange={ handleFormValues }
                />

                <i 
                    className="fas fa-info-circle"
                    title='Indica el peso relativo de la categoría en el promedio de la etapa, representado porcentualmente. La suma de las incidencias de todas las categorías de la etapa no puede ser mayor al 100%. El conjunto de las categorías cuya incidencia no se especifique, o se fije en 0, ocupará el porcentaje necesario para alcanzar el 100% del promedio de la etapa; y dentro de ese conjunto, todas las categorías tendrán el mismo peso.'
                ></i>
            </span>

            <button type='submit' className='sendButton'>Agregar categoría</button>
        </form>
    )
}
