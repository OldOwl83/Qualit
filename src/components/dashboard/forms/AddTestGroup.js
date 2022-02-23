import React from 'react'
import { useDispatch } from 'react-redux';

import Swal from 'sweetalert2';

import { useForms } from '../../../hooks/useForms'
import { unsetFormScreen } from '../../../actions/ui';
import { addTestGroupAction } from '../../../actions/courseData';


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
                required
                value={ testGroup }
                onChange={ handleFormValues }
            />

            <input 
                type="text"
                placeholder="Incidencia porcentual en la etapa"
                name="percentWeight"
                autoComplete='off'
                value={ percentWeight }
                onChange={ handleFormValues }
            />

            <button type='submit' className='sendButton'>Agregar categoría</button>
        </form>
    )
}
