import React from 'react';

export const Average = ( { studentId, testGroupObj } ) => {

    let weights = 0;

    let unweightedGradesSum = 0;
    let unweightedGradesNum = 0;

    let weigthedGradesSum = 0;

    for( const test of testGroupObj.tests )
    {
        if( test.grades.find( grade => grade.idStudent === studentId ).score !== null )
        {
            if( test.percentWeight )
            {
                weigthedGradesSum += test.percentWeight * test.grades.find( grade => grade.idStudent === studentId ).score;
    
                weights += test.percentWeight;
            }else
            {
                unweightedGradesSum += test.grades.find( grade => grade.idStudent === studentId ).score;
    
                unweightedGradesNum++;
            }
        }
    }
    
    if( unweightedGradesNum )
    {
        let unweightedGradesAverage = unweightedGradesSum / unweightedGradesNum;
    
        weigthedGradesSum += unweightedGradesAverage * ( 100 - weights );

        weights = 100;
    }


    return (
    
        <div className='cells container grades'>{ (weigthedGradesSum / weights).toFixed( 2 ) }</div>

    );
}
