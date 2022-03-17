import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';
import { deleteTestAction, updateTestAction } from '../../../actions/courseData';

import { unsetFormScreen } from '../../../actions/ui';
import { formValidate } from '../../../helpers/formValidate';
import { useForms } from '../../../hooks/useForms';


export const UpdateTest = ( { testIndex, testGroupIndex, stageIndex } ) => {
    
    const dispatch = useDispatch();

    const { institutions, activeCourse } = useSelector( state => state.data );

    const updatedTest = institutions[ activeCourse.institution ].groups[ activeCourse.group ].courses[ activeCourse.course ].stages[ stageIndex ].testGroups[ testGroupIndex ].tests[ testIndex ];

    const [ formValues, handleFormValues ] = useForms( { 

        test: updatedTest?.test,
        percentWeight: updatedTest?.percentWeight,
        additionalData: updatedTest?.additionalData,
    } );

    const { test, percentWeight, additionalData } = formValues;


    const handleUpdateTest = ( e ) => {

        e.preventDefault();

        try{
            if( formValidate( { percentWeight } ) )
                dispatch( updateTestAction( test, percentWeight, additionalData, testIndex, testGroupIndex, stageIndex ) );
        }catch( err )
        {
            Swal.fire({
                title: 'Error en la actualización de la evaluación',
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

    const handleDeleteTest = () => {
        
        Swal.fire({
            title: `¿Está seguro/a de que desea eliminar la evaluación "${institutions[activeCourse.institution].groups[activeCourse.group].courses[ activeCourse.course ].stages[stageIndex].testGroups[ testGroupIndex ].tests[ testIndex ].test }"?`,
            text: 'Si guarda los cambios, se perderán sus datos de manera definitiva.',
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
                    dispatch( deleteTestAction( testIndex, testGroupIndex, stageIndex ) );
                    
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Evaluación eliminada',
                        showConfirmButton: false,
                        timer: 1000
                        });

                    dispatch( unsetFormScreen() );
                }
            });
    };


    return (
    
        <form onSubmit={ handleUpdateTest } className='forms' >

            <i className="far fa-window-close" onClick={ () => dispatch( unsetFormScreen() ) }></i>

            <h3>Editar evaluación</h3>

            <input 
                type="text"
                placeholder="Evaluación"
                name="test"
                autoComplete='off'
                autoFocus
                onFocus={ ( e ) => e.target.select() }
                value={ test }
                onChange={ handleFormValues }
            />

            <span>
                <input 
                    type="text"
                    placeholder="Incidencia porcentual en la categoría"
                    name="percentWeight"
                    autoComplete='off'
                    onFocus={ ( e ) => e.target.select() }
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

            <div id="buttonsContainer">
                <button type='submit' className='sendButton'>Actualizar evaluación</button>
                <i className="fas fa-trash-alt" title="Eliminar evaluación" onClick={ handleDeleteTest }></i>
            </div>
        </form>
    )
}
