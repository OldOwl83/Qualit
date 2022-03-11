import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { verifyEmail } from '../../actions/auth';
import { NewPasswordScreen } from './NewPasswordScreen';


export const Verifications = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    const code = location.search.slice( location.search.indexOf( 'oobCode' ) + 8, location.search.indexOf( '&', location.search.indexOf( 'oobCode' ) + 8 ) );

    const mode = location.search.slice( location.search.indexOf( 'mode' ) + 5, location.search.indexOf( '&', location.search.indexOf( 'mode' ) + 5 ) );

    if( mode === 'verifyEmail' )
    {
        dispatch( verifyEmail( code ));

        return <Navigate to={ '../login' } />;
    }

    else if( mode === 'resetPassword' )
        return <NewPasswordScreen recoveryCode={ code } />;
}
