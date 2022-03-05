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
        <div className='container stageContainer'>
            <h4 
                className='cells edit'
                title={ `Editar etapa "${ stageObj.stage }"` } 
                onClick={ handleStageUpdate }
            >
                { stageObj.stage }
            </h4>

            <div className="testGroupsContainer">
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
        </div>
    )
}
