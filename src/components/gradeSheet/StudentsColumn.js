import React from 'react'
import { useDispatch } from 'react-redux';
import { setFormScreen } from '../../actions/ui';
import { AddStudent } from '../dashboard/forms/AddStudent';

export const StudentsColumn = () => {

    const dispatch = useDispatch();

    const handleNewStudent = () => {

        dispatch( setFormScreen( <AddStudent /> ) );
    };

    return (
        <div id="studentsColumn">


            <i className="fas fa-plus" title="Agregar estudiante" onClick={ handleNewStudent }></i>
        </div>
    )
}
