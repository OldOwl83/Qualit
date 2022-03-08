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

            <h5 
                className='cells edit'
                title={ `Editar "${ testObj.test }"` }
                onClick={ handleTestUpdate }
            >
                { 
                    testObj.test.length < 6 ?
                    testObj.test :
                    testObj.test.slice(0, 4) + '...'
                }
            </h5>

            <div className='gradesContainer'>
                {
                    institutions[ activeCourse.institution ].groups[ activeCourse.group ].students.map( student => (
                    <Score 
                        key={ student.id }
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
