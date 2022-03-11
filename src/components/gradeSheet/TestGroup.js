import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFormScreen } from '../../actions/ui';
import { AddTest } from '../dashboard/forms/AddTest';
import { UpdateTestGroup } from '../dashboard/forms/UpdateTestGroup';
import { Average } from './Average';
import { Test } from './Test';

export const TestGroup = ( { testGroupObj, testGroupIndex, stageIndex } ) => {

    const dispatch = useDispatch();

    const { institutions, activeCourse } = useSelector( state => state.data );


    const handleTestGroupUpdate = () => {

        dispatch( setFormScreen( <UpdateTestGroup testGroupIndex={ testGroupIndex } stageIndex={ stageIndex } /> ) );
    };

    const handleNewTest = () => {

        dispatch( setFormScreen( <AddTest testGroupIndex={ testGroupIndex } stageIndex={ stageIndex } />))
    };


    return (
    
        <div className='container testGroupContainer'>

            <h4 
                className='cells edit'
                title={ `Editar "${ testGroupObj.testGroup }"` } 
                onClick={ handleTestGroupUpdate }
            >
                { 
                    testGroupObj.testGroup.length < 10 ?
                    testGroupObj.testGroup :
                    testGroupObj.testGroup.slice(0, 8) + '...'
                }
            </h4>

            <div className='testsContainer'>
                <div className='leftHalfContainer'>
                    {
                        testGroupObj.tests.map( ( test, index ) => (
                        
                            <Test 
                                key={ test.test } 
                                testObj={ test } 
                                testIndex={ index } 
                                testGroupIndex={ testGroupIndex } 
                                stageIndex={ stageIndex } 
                            />))
                    }

                    <div 
                        className='cells buttons test'
                        title='Añadir evaluación'
                        onClick={ handleNewTest }
                    >
                        <i className="fas fa-plus"></i>
                    </div>
                </div>

                <div className='averagesContainer' style={{ marginTop: '2px' }}>

                    <h5 
                        className='cells'
                        title={ `Promedio de la categoría "${ testGroupObj.testGroup }"`}
                    >Pr. catg.</h5>

                    { institutions[ activeCourse.institution ].groups[ activeCourse.group ].students.map( student => {

                        return <Average 
                                    key={ student.id} 
                                    studentId={ student.id }
                                    studentLastName={ student.lastName } 
                                    object={ testGroupObj } 
                                />
                    }) }
                </div>
            </div>
        </div>
        
    )
}
