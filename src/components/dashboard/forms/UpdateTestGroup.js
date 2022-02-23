import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';

import { useForms } from '../../../hooks/useForms';
import { unsetFormScreen } from '../../../actions/ui';
import { deleteTestGroupAction, updateTestGroupAction } from '../../../actions/courseData';


export const UpdateTestGroup = ( { testGroupIndex, stageIndex } ) => {
    
    const dispatch = useDispatch();

    const { institutions, activeCourse } = useSelector( state => state.data );

    const updatedTestGroup = institutions[ activeCourse.institution ].groups[ activeCourse.group ].courses[ activeCourse.course ].stages[ stageIndex ].testGroups[ testGroupIndex ];

    const [ formValues, handleFormValues ] = useForms( { 

        testGroup: updatedTestGroup?.testGroup,
        percentWeight: updatedTestGroup?.percentWeight,
    } );

    const { testGroup, percentWeight } = formValues;


    const handleUpdateTestGroup = ( e ) => {

        e.preventDefault();

        try{
            dispatch( updateTestGroupAction( testGroup, percentWeight, testGroupIndex, stageIndex ) );
        }catch( err )
        {
            Swal.fire({
                title: 'Error en la actualización de la categoría',
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

    const handleDeleteTestGroup = () => {
        
        Swal.fire({
            title: `¿Está seguro/a que desea eliminar la cateogría "${institutions[activeCourse.institution].groups[activeCourse.group].courses[activeCourse.course].stages[stageIndex].testGroups[ testGroupIndex ].testGroup }"?`,
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
                    dispatch( deleteTestGroupAction( testGroupIndex, stageIndex ) );
                    
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Categoría eliminada',
                        showConfirmButton: false,
                        timer: 1000
                        });

                    dispatch( unsetFormScreen() );
                }
            });
    };


    return (
    
        <form onSubmit={ handleUpdateTestGroup } className='forms' >

            <i className="far fa-window-close" onClick={ () => dispatch( unsetFormScreen() ) }></i>

            <h3>Editar categoría</h3>

            <input 
                type="text"
                placeholder="Nombre de la categoría"
                name="testGroup"
                autoComplete='off'
                autoFocus
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

            <div id="buttonsContainer">
                <button type='submit' className='sendButton'>Actualizar categoría</button>
                <i className="fas fa-trash-alt" title="Eliminar categoría" onClick={ handleDeleteTestGroup }></i>
            </div>
        </form>
    )
}
