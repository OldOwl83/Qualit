import React from 'react'
import { useDispatch } from 'react-redux';
import { setFormScreen } from '../../actions/ui';
import { AddTestGroup } from '../dashboard/forms/AddTestGroup';
import { UpdateStage } from '../dashboard/forms/UpdateStage';
import { TestGroup } from './TestGroup';

export const Stage = ( { stageObj, stageIndex } ) => {

    const dispatch = useDispatch();

    const handleStageUpdate = () => {

        dispatch( setFormScreen( <UpdateStage stageIndex={ stageIndex } /> ) );
    };

    const handleNewTestGroup = () => {

        dispatch( setFormScreen( <AddTestGroup stageIndex={ stageIndex } /> ) );
    };

    return (
        <>

            <h4 
                className='cells buttons'
                title='Editar etapa' 
                onClick={ handleStageUpdate }
            >
                { stageObj.stage }
            </h4>

            <div id="testGroupsContainer">
                {
                    stageObj.testGroups.map( ( tG, index ) => (
                    
                    <TestGroup
                        key={ tG.testGroup } 
                        testGroupObj={ tG }
                        testGroupIndex={ index }
                        stageIndex={ stageIndex }
                    /> ))
                }

                <h4 
                    id='addTestGroup'
                    className='cells buttons'
                    title='Añadir etapa'
                    onClick={ handleNewTestGroup }
                >
                    <i className="fas fa-plus"></i>
                </h4>
            </div>
        </>
    )
}
