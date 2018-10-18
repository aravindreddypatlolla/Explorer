// action types
export const JobActionType = {
    GET_JOBS: "GET_JOBS",
    SET_JOBS: "SET_JOBS",
    SET_SUBJECT_PROPERTY: "SET_SUBJECT_PROPERTY",
    SET_JOB_FILTER: "SET_JOB_FILTER",
    APPLY_JOB_FILTER: "APPLY_JOB_FILTER",
    EXPORT_JOBS: "EXPORT_JOBS"
}

// actions
export const JobActions = {
    getJobs: (filters)=> ({ type: JobActionType.GET_JOBS, data: filters }),
    setSubjectProperty: (property)=> ({ type: JobActionType.SET_SUBJECT_PROPERTY, data: property }),
    applyJobFilter: (filter)=> ({ type: JobActionType.APPLY_JOB_FILTER, data: filter }),
    exportJobsToExcel: (filter)=> ({ type: JobActionType.EXPORT_JOBS, data: filter })
}

// reducer
export function JobReducer(state = {}, action) {
    switch(action.type) {
        case JobActionType.SET_SUBJECT_PROPERTY:
            return Object.assign({}, state, { subject: action.data });
        case JobActionType.SET_JOBS:
            if(action.data.DerivedFilters && action.data.DerivedFilters.Market) {
                return Object.assign({}, state, { result: { jobs: action.data.Jobs, aggregation: action.data.Aggregation }, 
                                                  filter: Object.assign({}, state.filter, { msaMarket: action.data.DerivedFilters.Market })});
            } else {
                return Object.assign({}, state, { result: { jobs: action.data.Jobs, aggregation: action.data.Aggregation } });
            }
        case JobActionType.SET_JOB_FILTER:
            return Object.assign({}, state, { filter: action.data });
        default:
            return state;
    }
}
