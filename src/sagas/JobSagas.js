import { call, put, takeEvery } from 'redux-saga/effects';
import * as jobService from '../services/JobService';
import { JobActionType } from '../reducers/jobReducer';

function* applyJobFilter(action) {
    try{
        yield put({type: JobActionType.SET_JOB_FILTER, data: action.data});
        const response = yield call(jobService.getJobs, action.data);
        yield put({type: JobActionType.SET_JOBS, data: response});
    } catch(e) {
        // ToDo: set application level state for showing errors
        console.log("ERROR: " + e.message);
    }
}

function* exportJobsToExcel(action) {
    try{
        const response = yield call(jobService.exportJobsToExcel, action.data);
        // there is no side-effect on the state at this point
    } catch(e) {
        // ToDo: set application level state for showing errors
        console.log("ERROR: " + e.message);
    }
}
// side-effects
function* jobSagas() {
    yield takeEvery(JobActionType.APPLY_JOB_FILTER, applyJobFilter);
    yield takeEvery(JobActionType.EXPORT_JOBS, exportJobsToExcel);
}

export default jobSagas;