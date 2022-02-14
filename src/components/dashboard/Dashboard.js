import React from 'react'
import { useSelector } from 'react-redux';

import { FormScreen } from './FormScreen';
import { TopNavbar } from './topNavbar/TopNavbar';


export const Dashboard = () => {

    const { formScreen } = useSelector( state => state.ui );

    return (
        <div className='animate__animated animate__fadeIn'>

            <TopNavbar />

            { formScreen && <FormScreen formComponent={ formScreen } />}
        </div>
    );
}
