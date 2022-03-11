import React from 'react';
import { useSelector } from 'react-redux';

import { GradesGrid } from './GradesGrid';
import { StudentsColumn } from './StudentsColumn';

export const GradeSheet = () => {

    const { data } = useSelector( state => state );

    const { institutions, activeCourse } = data;

    return (
        <div id="mainSheet" className='animate__animated animate__fadeIn'>
            {
                activeCourse.course !== -1 &&

                <>
                    <h3 id='courseTitle' className='cells container bigTitle'>
                        <span>{ institutions[ activeCourse.institution ].groups[ activeCourse.group ].courses[ activeCourse.course ].course }</span>
                        <span>{ institutions[ activeCourse.institution ].groups[ activeCourse.group ].group }</span>
                        <span>{ institutions[ activeCourse.institution ].institution }</span>
                    </h3>

                    <div id='gradeSheet'>
                        <StudentsColumn />
                        <GradesGrid />
                    </div>
                </>
            }
        </div>
    )
}
