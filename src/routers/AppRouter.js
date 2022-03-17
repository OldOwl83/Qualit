import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import { loginAction } from '../actions/auth';
import { Dashboard } from '../components/dashboard/Dashboard';
import { HomeSite } from '../components/HomeSite';
import { LoginScreen } from '../components/userLog/LoginScreen';
import { RegisterScreen } from '../components/userLog/RegisterScreen';
import { LoginRoutes } from './LoginRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { authentication } from '../SDKs/firebase';
import { getUserProfile } from '../actions/usProf';
import { LoadSpinner } from '../components/LoadSpinner';
import { downloadData } from '../actions/courseData';
import { RecoveryScreen } from '../components/userLog/RecoveryScreen';
import { Verifications } from '../components/userLog/Verifications';
import { UserReports } from '../components/development/UserReports';


export const AppRouter = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector( state => state.ui );
    
    
    useEffect( () => {

        onAuthStateChanged( authentication, async( user ) => {

            if( user?.uid && user?.emailVerified )
            {
                await dispatch( getUserProfile( user.uid ) );
                await dispatch( downloadData( user.uid ) );
                dispatch( loginAction( user.uid ) );
            }
        });
    }, [ dispatch ] );


    return (

        <BrowserRouter>
            { loading && <LoadSpinner /> }
            <Routes>

                <Route path="/" element={ <HomeSite /> } />
                
                <Route path="/reports" element={ <UserReports /> } />

                <Route path="/register" element={ 
                    <LoginRoutes>
                        <RegisterScreen /> 
                    </LoginRoutes>
                } />

                <Route path='/login' element={ 
                    <LoginRoutes>
                        <LoginScreen /> 
                    </LoginRoutes>
                } />
                
                <Route path='/recovery' element={ 
                    <LoginRoutes>
                        <RecoveryScreen /> 
                    </LoginRoutes>
                } />

                <Route path='/verifications' element={ 
                    <LoginRoutes>
                        <Verifications /> 
                    </LoginRoutes>
                } />

                <Route path='/dashboard' element={
                    <PrivateRoutes>
                        <Dashboard />
                    </PrivateRoutes> 
                } />

                <Route path="/*" element={ <HomeSite /> } />

            </Routes>
        </BrowserRouter>
    );
};
