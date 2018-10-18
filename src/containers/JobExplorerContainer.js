import { connect } from 'react-redux';
import { JobExplorerPage } from '../components/JobExplorer/JobExplorerPage'
import { JobActions } from '../reducers/jobReducer';
import { AppActions } from '../reducers/appReducer';

export function mapStateToProps(store) {
    return {
        result: store.jobExplorer.result,
        subject: store.jobExplorer.subject,
        filter: store.jobExplorer.filter,
        notifications: store.notifications
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        getJobs: (filters)=> dispatch(JobActions.getJobs(filters)),
        setSubjectProperty: (property)=> dispatch(JobActions.setSubjectProperty(property)),
        applyJobFilter: (filter)=> dispatch(JobActions.applyJobFilter(filter)),
        exportJobsToExcel: (filters)=> dispatch(JobActions.exportJobsToExcel(filters)),
        notify: (type, options)=> dispatch(AppActions.notify(type, options))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobExplorerPage)