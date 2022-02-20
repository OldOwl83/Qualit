import React from 'react'
import { useSelector } from 'react-redux';

import { FormScreen } from './FormScreen';
import { GradeSheet } from '../gradeSheet/GradeSheet';
import { TopNavbar } from './topNavbar/TopNavbar';


export const Dashboard = () => {

    const { formScreen } = useSelector( state => state.ui );

    return (
        <>
        { formScreen && <FormScreen formComponent={ formScreen } />}
        
        <div className='animate__animated animate__fadeIn'>

            <TopNavbar />

            <GradeSheet />

        </div>
        </>
    );
}
