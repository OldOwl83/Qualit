import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { setFormScreen } from '../../actions/ui';
import { AddTestGroup } from '../dashboard/forms/AddTestGroup';
import { UpdateStage } from '../dashboard/forms/UpdateStage';
import { Average } from './Average';
import { TestGroup } from './TestGroup';

export const Stage = ( { stageObj, stageIndex } ) => {

    const dispatch = useDispatch();
    const { institutions, activeCourse } = useSelector( state => state.data );

    const handleStageUpdate = () => {

        dispatch( setFormScreen( <UpdateStage stageIndex={ stageIndex } /> ) );
    };

    const handleNewTestGroup = () => {

        dispatch( setFormScreen( <AddTestGroup stageIndex={ stageIndex } /> ) );
    };

    return (
        <div className='container stageContainer'>
            <h4 
                className='cells edit'
                title={ `Editar "${ stageObj.stage }"` } 
                onClick={ handleStageUpdate }
            >
                { 
                    stageObj.stage.length < 20 ?
                    stageObj.stage :
                    stageObj.stage.slice(0, 19) + '...'
                }
            </h4>

            <div className="testGroupsContainer">
                <div className='leftHalfContainer'>
                    {
                        stageObj.testGroups.map( ( tG, index ) => (
                        
                        <TestGroup
                            key={ tG.testGroup } 
                            testGroupObj={ tG }
                            testGroupIndex={ index }
                            stageIndex={ stageIndex }
                        /> ))
                    }

                    <div 
                        className='cells buttons testGroup'
                        title='Añadir categoría'
                        onClick={ handleNewTestGroup }
                    >
                        <i className="fas fa-plus"></i>
                    </div>
                </div>

                <div className='averagesContainer' style={{ marginBottom: '3px' }}>

                    <h5 className='cells'>Pr. etap</h5>

                    { institutions[ activeCourse.institution ].groups[ activeCourse.group ].students.map( student => {

                        return <Average 
                                    key={ student.id} 
                                    studentId={ student.id }
                                    studentLastName={ student.lastName } 
                                    object={ stageObj } 
                                />
                    }) }
                </div>
            </div>
        </div>
    )
}
