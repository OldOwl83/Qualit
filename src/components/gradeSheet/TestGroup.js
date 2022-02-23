import React from 'react';
import { useDispatch } from 'react-redux';

import { setFormScreen } from '../../actions/ui';
import { UpdateTestGroup } from '../dashboard/forms/UpdateTestGroup';

export const TestGroup = ( { testGroupObj, testGroupIndex, stageIndex } ) => {

    const dispatch = useDispatch();

    const handleTestGroupUpdate = () => {

        dispatch( setFormScreen( <UpdateTestGroup testGroupIndex={ testGroupIndex } stageIndex={ stageIndex } /> ) );
    };

console.log( testGroupObj)
    return (
    
        <div>

            <h4 
                className='cells buttons'
                title='Editar categoría' 
                onClick={ handleTestGroupUpdate }
            >
                { testGroupObj.testGroup }
            </h4>

            {
                testGroupObj.tests.map( test => <h5>¡Viva Perón!</h5> )
            }

        </div>
        
    )
}
