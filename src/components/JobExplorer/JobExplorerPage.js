import React, { Component } from 'react';
import { JobFilters } from './JobFilters';
import { JobAggregations } from './JobAggregations';
import { JobMap } from './JobMap';
import Notifications from 'react-notification-system-redux';

const style = {
      NotificationItem: { 
        DefaultStyle: { 
          margin: '120px 5px 2px 1px',
          backgroundColor: '#FFF',
          color: '#333'
        },
        error: { 
          color: 'red'
        }
      },
      Title: {
        DefaultStyle: {
        fontSize: '14px',
        margin: '0 0 5px 0',
        padding: 0,
        fontWeight: 'bold',
        color: '#d80027'
       }
      },
    Dismiss: {
        DefaultStyle: {
        cursor: 'pointer',
        fontFamily: 'Arial',
        fontSize: '17px',
        position: 'absolute',
        top: '4px',
        right: '5px',
        lineHeight: '15px',
        backgroundColor: '#d80027',
        color: '#ffffff',
        borderRadius: '50%',
        width: '14px',
        height: '14px',
        fontWeight: 'bold',
        textAlign: 'center'
        }
    }
    };

export class JobExplorerPage extends Component {
    render() {
        return(
            <div className="job-explorer">
                <JobAggregations jobs={this.props.result.jobs} filter={this.props.filter} aggregation={this.props.result.aggregation} exportJobsToExcel={this.props.exportJobsToExcel} />
                <div className="filter-bar">
                    <JobFilters jobs={this.props.result.jobs} filter={this.props.filter} applyJobFilter={this.props.applyJobFilter} notify={this.props.notify}/>
                </div>
                <div className="map-holder">
                    <div className="map">
                        <JobMap jobs={this.props.result.jobs} setSubjectProperty={this.props.setSubjectProperty} applyJobFilter={this.props.applyJobFilter} />
                    </div>
                </div>
                <Notifications notifications={this.props.notifications} style={style} />
            </div>
        )
    }
}