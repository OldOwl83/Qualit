import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFormScreen } from '../../actions/ui';
import { AddStudent } from '../dashboard/forms/AddStudent';
import { UpdateStudent } from '../dashboard/forms/UpdateStudent';

export const StudentsColumn = () => {

    const dispatch = useDispatch();

    const { data } = useSelector( state => state );

    const { institutions, activeCourse } = data;

    const { students, courses } = institutions[ activeCourse.institution ].groups[ activeCourse.group ];

    const handleNewStudent = () => {

        dispatch( setFormScreen( <AddStudent /> ) );
    };

    const handleStudentUpdate = ( index ) => {

        dispatch( setFormScreen( <UpdateStudent studentIndex={ index } /> ) );
    };

    return (
        <div id="studentsColumn">

            <h3 className='cells container bigTitle'>Curso</h3>
            <h4 className='cells container stageContainer'>Etapas</h4>
            <h4 className='cells container testGroupContainer'>Categorías</h4>
            <h5 className='cells container testContainer'>Evaluaciones</h5>
            

            { 
                students.map( ( student, index ) => {
                    return (
                        <div 
                            key={ student.id }
                            className='cells container students'
                            title="Editar estudiante"
                            onClick={ () => handleStudentUpdate( index ) }
                        >
                            { `${ student.lastName }, ${ student.firstName }` }
                        </div> 
                    )
                })
            }

            <div 
                className='cells buttons' 
                title="Agregar estudiante" 
                onClick={ handleNewStudent }
            >    
                    <i className="fas fa-plus"></i>
            </div>
        </div>
    )
}
