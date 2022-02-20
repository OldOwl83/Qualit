import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { setActiveCourse, setActiveGroup, setActiveInstitution } from '../../../actions/activeCourse';
import { deleteCourseAction, uploadData } from '../../../actions/courseData';
import { setFormScreen } from '../../../actions/ui';
import { AddCourse } from '../forms/AddCourse';
import { UpdateCourse } from '../forms/UpdateCourse';

export const CourseSelector = () => {

    const dispatch = useDispatch();
    const { data, auth } = useSelector( state => state );

    const { institutions, activeCourse } = data;

    const handleNewCourse = () => {

        dispatch( setFormScreen( <AddCourse /> ) );
    };

    const handleUpdateCourse = () => {

        if( activeCourse.course !== -1 )

            dispatch( setFormScreen( <UpdateCourse /> ) );
        else
        {
            Swal.fire({
                title: 'No hay ningún curso seleccionado',
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
    };

    const handleDeleteCourse = () => {

        if( activeCourse.course !== -1 )
        {
            Swal.fire({
                title: `¿Está seguro/a que desea borrar el curso "${institutions[activeCourse.institution].groups[activeCourse.group].courses[activeCourse.course].course}"?`,
                text: 'Si guarda los cambios, se eliminará de manera definitiva.',
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
                    dispatch( deleteCourseAction() );
                    
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Curso eliminado',
                        showConfirmButton: false,
                        timer: 1000
                      });
                }
              });

        }else
        {
            Swal.fire({
                title: 'No hay ningún curso seleccionado',
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
    };

    const handleDataSave = () => {

        dispatch( uploadData( data, auth.uid ) );
    };


    return (
        <div id="courseSelector">

            <div className='selector'>

                <p>Institución</p>

                <div className='buttonsContainer'>
                    {
                        institutions.map( ( instit, index ) => (

                            <button 
                                key={ instit.institution }
                                className={ activeCourse.institution === index ? 'active' : '' }
                                onClick={ () => dispatch( setActiveInstitution( index ) ) }
                            >
                                    { instit.institution }
                            </button>

                        ) )
                    }
                </div>
            </div>

            <div className='selector' id="classSelector">

                <p>Grupo</p>

                <div className='buttonsContainer'>
                    {
                        activeCourse.institution !== -1 &&
                        
                        institutions[ activeCourse.institution ].groups.map( ( group, index ) => (

                            <button 
                                key={ group.group }
                                className={ activeCourse.group === index ? 'active' : '' }
                                onClick={ () => dispatch( setActiveGroup( index ) ) }
                            >
                                    { group.group }
                            </button>

                        ) )
                    }
                </div>
            </div>

            <div className='selector'>

                <p>Curso</p>

                <div className='buttonsContainer'>
                    {
                        activeCourse.group !== -1 &&
                        
                        institutions[ activeCourse.institution ].groups[ activeCourse.group ].courses.map( ( course, index ) => (

                            <button 
                                key={ course.course }
                                className={ activeCourse.course === index ? 'active' : '' }
                                onClick={ () => dispatch( setActiveCourse( index ) ) }
                            >
                                    { course.course }
                            </button>

                        ) )
                    }
                </div>
            </div>

            <div id="courseOptContainer">

                <i className="fas fa-plus" title="Agregar curso" onClick={ handleNewCourse }></i>
                <i className="fas fa-pen" title="Editar curso seleccionado" onClick={ handleUpdateCourse }></i>
                <i className="fas fa-trash-alt" title="Eliminar curso seleccionado" onClick={ handleDeleteCourse }></i>
                <button 
                    title="Salvar los últimos cambios"
                    onClick={ handleDataSave }
                >Guardar</button>
                
            </div>

        </div>
    );
}
