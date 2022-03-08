import React from 'react';

export const Average = ( { studentId, studentLastName, object } ) => {
console.log("Average: ", studentId);

    const average = object.getAverage( studentId );

    return (
    
        <div 
            className='cells container score avr'
            title={ studentLastName }
        >
            
            { isNaN( average ) ? '-' : average > 10 ? Math.round( average ) : average.toFixed( 2 ) }
        
        </div>
    );
};
