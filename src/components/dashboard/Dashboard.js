import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FormScreen } from './FormScreen';
import { GradeSheet } from '../gradeSheet/GradeSheet';
import { TopNavbar } from './topNavbar/TopNavbar';


export const Dashboard = () => {

    const { ui } = useSelector( state => state );
    
    const { formScreen, dataSaved } = ui;

    
    const preventUnloadWindow = ( e ) => {

        e.preventDefault();

        return e.returnValue = 'Hay cambios sin guardar. Si continúa, se perderán.';
    };

    useEffect(() => {
        
        if( !dataSaved )
            window.addEventListener( 'beforeunload', preventUnloadWindow );
        else
            window.removeEventListener( 'beforeunload', preventUnloadWindow );

    
        return () => {
            window.removeEventListener( 'beforeunload', preventUnloadWindow );
        };

    }, [ dataSaved ]);


    return (
        <>
        { formScreen && <FormScreen formComponent={ formScreen } />}
        
        <div id="dashboard" className='animate__animated animate__fadeIn'>

            <TopNavbar />

            <GradeSheet />

        </div>
        </>
    );
}
