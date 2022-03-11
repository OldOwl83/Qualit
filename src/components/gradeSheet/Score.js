import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setScoreAction } from '../../actions/testData';
import { formValidate } from '../../helpers/formValidate';

export const Score = ( { studentId, testObj, testIndex, testGroupIndex, stageIndex } ) => {

    const dispatch = useDispatch();

    const [ score, setScore ] = useState( testObj.grades.filter( grade => grade.idStudent === studentId )[0].score === null ? "" : testObj.grades.filter( grade => grade.idStudent === studentId )[0].score );


    const handleChangeScore = ( e ) => {

        let scoreData;

        if( e.target.value === "" )
            scoreData = null;
        else
            scoreData = Number( e.target.value ); 

        setScore( e.target.value );
        dispatch( setScoreAction( studentId, scoreData, testIndex, testGroupIndex, stageIndex ) );
    };


    const handleValueValidation = ( e ) => {

        if( !formValidate( { score: e.target.value }))
        {
            setScore( '' );
            dispatch( setScoreAction( studentId, null, testIndex, testGroupIndex, stageIndex ) );
        }
    }


    return (

        <input 
            key={ studentId }
            className='cells container score grades'
            type="text"
            value={ score }
            onChange={ handleChangeScore }
            onBlur={ handleValueValidation }
        />
    );
}
