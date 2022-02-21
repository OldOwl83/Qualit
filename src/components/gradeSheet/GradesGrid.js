import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFormScreen } from '../../actions/ui';
import { AddStage } from '../dashboard/forms/AddStage';
import { Stage } from './Stage';

export const GradesGrid = () => {

    const dispatch = useDispatch();

    const { institutions, activeCourse } = useSelector( state => state.data );

    const handleNewStage = () => {

        dispatch( setFormScreen( <AddStage /> ) );
    };

    return (

        <div id="gradesGrid">

            <h3 className='cells'>{ `${ institutions[ activeCourse.institution ].institution } - ${ institutions[ activeCourse.institution ].groups[ activeCourse.group ].group } - ${ institutions[ activeCourse.institution ].groups[ activeCourse.group ].courses[ activeCourse.course ].course }` }</h3>

            <div id='stagesContainer'>
                {
                    institutions[ activeCourse.institution ].groups[ activeCourse.group ].courses[ activeCourse.course ].stages.map( stage => <Stage key={ stage.stage } stageObj={ stage } /> )
                }

                <h4 
                    className='cells buttons'
                    title='Añadir etapa'
                    onClick={ handleNewStage }
                >
                    <i className="fas fa-plus"></i>
                </h4>
            </div>
            

        </div>
    )
}
