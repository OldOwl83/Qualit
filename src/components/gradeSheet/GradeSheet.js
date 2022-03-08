import React from 'react';
import { useSelector } from 'react-redux';

import { GradesGrid } from './GradesGrid';
import { StudentsColumn } from './StudentsColumn';

export const GradeSheet = () => {

    const { data } = useSelector( state => state );

    const { activeCourse } = data;

    return (
        <div id="mainSheet" className='animate__animated animate__fadeIn'>
            {
                activeCourse.course !== -1 &&
                <>
                    <StudentsColumn />
                    <GradesGrid />
                </>
            }
        </div>
    )
}
