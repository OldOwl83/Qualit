import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFormScreen } from '../../actions/ui';
import { AddStage } from '../dashboard/forms/AddStage';
import { Average } from './Average';
import { Stage } from './Stage';

export const GradesGrid = () => {

    const dispatch = useDispatch();
    const { institutions, activeCourse } = useSelector( state => state.data );

    const handleNewStage = () => {

        dispatch( setFormScreen( <AddStage /> ) );
    };

    return (

        <div id="gradesGrid">

            <div id='stagesContainer'>
                {
                    institutions[ activeCourse.institution ].groups[ activeCourse.group ].courses[ activeCourse.course ].stages.map( ( stage, index ) => (
                    
                    <Stage 
                        key={ stage.stage } 
                        stageObj={ stage } 
                        stageIndex={ index } 
                    />) )
                }

                <div className='cells buttons stage'
                    title='Añadir etapa'
                    onClick={ handleNewStage }
                >
                    <i className="fas fa-plus"></i>
                </div>
            </div>
            <div className='stagesContainer'>
                <h4 className='cells' style={{ marginBottom: '5px', visibility: 'hidden' }}>Relleno</h4>   
                <h4 className='cells' style={{ marginBottom: '4px', visibility: 'hidden' }}>Relleno</h4> 

                <div id='promGral' className='averagesContainer container' style={{ marginBottom: '3px' }}>
                    
                    <h5 className='cells'>Promedio final</h5>

                    { institutions[ activeCourse.institution ].groups[ activeCourse.group ].students.map( student => {

                        return <Average 
                                    key={ student.id} 
                                    studentId={ student.id }
                                    studentLastName={ student.lastName } 
                                    object={ institutions[ activeCourse.institution ].groups[ activeCourse.group ].courses[ activeCourse.course ] } 
                                />
                    }) }
                </div>
            </div>
        </div>
    )
}
