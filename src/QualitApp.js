import React from 'react';
import { Provider } from 'react-redux';
import { store } from './reduxSettings/store';
import { AppRouter } from './routers/AppRouter';

import './styles/style.css';

export const QualitApp = () => {

    return (
        <Provider store={ store }>
            <AppRouter />
        </Provider>
    );
};
