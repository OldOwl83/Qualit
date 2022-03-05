import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFormScreen } from '../../actions/ui';
import { UpdateTest } from '../dashboard/forms/UpdateTest';
import { Score } from './Score';

export const Test = ( { testObj, testIndex, testGroupIndex, stageIndex } ) => {

    const dispatch = useDispatch();

    const { institutions, activeCourse } = useSelector( state => state.data );


    const handleTestUpdate = () => {

        dispatch( setFormScreen( <UpdateTest testIndex={ testIndex } testGroupIndex={ testGroupIndex } stageIndex={ stageIndex } /> ) );
    };


    return (
    
        <div className='container testContainer'>

            <h4 
                className='cells edit'
                title={ `Editar evaluación "${ testObj.test }"` }
                onClick={ handleTestUpdate }
            >
                { testObj.test }
            </h4>

            <div className='gradesContainer'>
                {
                    institutions[ activeCourse.institution ].groups[ activeCourse.group ].students.map( student => (
                    <Score 
                        key={ student.id }
                        className='cells container grades'
                        type="text"
                        studentId={ student.id }
                        testObj={ testObj }
                        testIndex={ testIndex }
                        testGroupIndex={ testGroupIndex }
                        stageIndex={ stageIndex }
                    />))
                }
            </div>
        </div>
        
    )
}
