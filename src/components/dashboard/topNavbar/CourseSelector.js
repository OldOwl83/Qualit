import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { setActiveCourse, setActiveGroup, setActiveInstitution } from '../../../actions/activeCourse';
import { setFormScreen } from '../../../actions/ui';
import { SetCourse } from '../forms/SetCourse';

export const CourseSelector = () => {

    const dispatch = useDispatch();
    const { data, activeCourse } = useSelector( state => state );

    const handleNewSubject = () => {

        dispatch( setFormScreen( <SetCourse /> ) );
    };


    return (
        <div id="courseSelector">

            <div className='selector'>

                <p>Institución</p>

                <div className='buttonsContainer'>
                    {
                        data.map( ( instit, index ) => (

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
                        
                        data[ activeCourse.institution ].groups.map( ( group, index ) => (

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
                        
                        data[ activeCourse.institution ].groups[ activeCourse.group ].courses.map( ( course, index ) => (

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

                <i className="fas fa-plus" title="Agregar curso" onClick={ handleNewSubject }></i>
                <i className="fas fa-pen" title="Editar curso"></i>
                <button title="Salvar los últimos cambios realizados">Guardar</button>
                
            </div>

        </div>
    );
}
