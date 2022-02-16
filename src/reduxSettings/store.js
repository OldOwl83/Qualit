import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { authReducer } from "../reducers/authReducer";
import { dataReducer } from "../reducers/dataReducer";
import { uiReducer } from "../reducers/uiReducer";
import { userProfileReducer } from "../reducers/usProfReducer";
import { activeCourseReducer } from "../reducers/activeCourseReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers( {

    auth: authReducer,
    ui: uiReducer,
    usProf: userProfileReducer,
    data: dataReducer,
    activeCourse: activeCourseReducer,
} );

export const store = createStore( 
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);