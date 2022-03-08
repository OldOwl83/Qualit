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

            <h3 id='courseTitle' className='cells container bigTitle'>
                <span>{ institutions[ activeCourse.institution ].institution }</span>
                <span>{ institutions[ activeCourse.institution ].groups[ activeCourse.group ].group }</span>
                <span>{ institutions[ activeCourse.institution ].groups[ activeCourse.group ].courses[ activeCourse.course ].course }</span>
            </h3>

            <div id='stagesContainer'>
                <div className='leftHalfContainer'>
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

                <div id='promGral' className='averagesContainer container' style={{ marginBottom: '3px' }}>
                     
                    <h5 className='cells'>Pr. gral.</h5>

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
