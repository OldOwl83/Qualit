import React from 'react'
import { useSelector } from 'react-redux';

import { FormScreen } from './FormScreen';
import { GradeSheet } from '../gradeSheet/GradeSheet';
import { TopNavbar } from './topNavbar/TopNavbar';


export const Dashboard = () => {

    const { ui, data } = useSelector( state => state );

    const { formScreen } = ui;

    const { activeCourse } = data;

    return (
        <>
        { formScreen && <FormScreen formComponent={ formScreen } />}
        
        <div id="dashboard" className='animate__animated animate__fadeIn'>

            <TopNavbar />

            { activeCourse.course !== -1 && <GradeSheet /> }

        </div>
        </>
    );
}
