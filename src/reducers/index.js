import { combineReducers } from 'redux';
import { JobReducer } from './jobReducer';
import {reducer as notifications} from 'react-notification-system-redux';

export const rootReducer = combineReducers({
    jobExplorer: JobReducer,
    notifications
});

export const initialState = {
    jobExplorer: {
        filter: {},
        subject: null,
        result: {
            jobs: [],
            aggregation: {}
        }
    }
}