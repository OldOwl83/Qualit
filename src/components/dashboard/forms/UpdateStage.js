import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';

import { useForms } from '../../../hooks/useForms';
import { unsetFormScreen } from '../../../actions/ui';
import { deleteStageAction, updateStageAction } from '../../../actions/courseData';

export const UpdateStage = ( { stageIndex } ) => {
    
    const dispatch = useDispatch();

    const { institutions, activeCourse } = useSelector( state => state.data );

    const updatedStage = institutions[ activeCourse.institution ].groups[ activeCourse.group ].courses[ activeCourse.course ].stages[ stageIndex ];

    const [ formValues, handleFormValues ] = useForms( { 

        stage: updatedStage?.stage,
        percentWeight: updatedStage?.percentWeight,
    } );

    const { stage, percentWeight } = formValues;


    const handleUpdateStage = ( e ) => {

        e.preventDefault();

        try{
            dispatch( updateStageAction( stage, percentWeight, stageIndex ) );
        }catch( err )
        {
            Swal.fire({
                title: 'Error en la actualización de la etapa',
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

    const handleDeleteStage = () => {
        
        Swal.fire({
            title: `¿Está seguro/a de que desea eliminar la etapa "${institutions[activeCourse.institution].groups[activeCourse.group].courses[activeCourse.course].stages[stageIndex].stage}"?`,
            text: 'Si guarda los cambios, se perderán sus datos de manera definitiva; incluidas las evaluaciones. Puede editar éstas si quiere conservarlas',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Aceptar',
            focusCancel: true,
            showClass: {
                popup: 'animate__animated animate__backInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__backOutUp'
            }
            })
            .then( result => {

                if( result.isConfirmed )
                {
                    dispatch( deleteStageAction( stageIndex ) );
                    
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Etapa eliminada',
                        showConfirmButton: false,
                        timer: 1000
                        });

                    dispatch( unsetFormScreen() );
                }
            });
    };


    return (
    
        <form onSubmit={ handleUpdateStage } className='forms' >

            <i className="far fa-window-close" onClick={ () => dispatch( unsetFormScreen() ) }></i>

            <h3>Editar etapa</h3>

            <input 
                type="text"
                placeholder="Nombre de la etapa"
                name="stage"
                autoComplete='off'
                autoFocus
                value={ stage }
                onChange={ handleFormValues }
            />

            <input 
                type="text"
                placeholder="Incidencia porcentual en el promedio final"
                name="percentWeight"
                autoComplete='off'
                value={ percentWeight }
                onChange={ handleFormValues }
                />

            <div id="buttonsContainer">
                <button type='submit' className='sendButton'>Actualizar etapa</button>
                <i className="fas fa-trash-alt" title="Eliminar etapa" onClick={ handleDeleteStage }></i>
            </div>
        </form>
    )
}
