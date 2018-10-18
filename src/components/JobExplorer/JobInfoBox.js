import React, { Component } from 'react';
import * as jobService from '../../services/JobService';
import NumberFormat from 'react-number-format';


function getUserType() {    
    return jobService.getUserType();
}

export class JobInfoBox extends Component {
    render() {
        if(!this.props.job) 
            return null;
        
        return(
           
            <div className="infobox-content">
                <div className="prop-pic-container"> 
                    <img className="prop-pic" src={ "./api/image/GetImage/" + this.props.job.JobId } />
                </div>
                <table className="infobox-table">
                    <tbody>
                        <tr>
                            <td>Job #</td>
                            <td>{this.props.job.OfficeFile}</td>
                        </tr>
                        <tr>
                            <td>Property Name</td>
                            <td>{this.props.job.Name}</td>
                        </tr>
                        <tr>
                            <td>Property Major Type</td>
                            <td>{this.props.job.PropertyMajorType}</td>
                        </tr>
                        <tr>
                            <td>Client Company</td>
                            <td>{this.props.job.Client}</td>
                        </tr>
                        <tr>
                            <td>Report Date</td>
                            <td>{this.props.job.ReportDate}</td>
                        </tr>
                        </tbody>
                    { 
                    getUserType() === "Bidder" ?
                    (
                        <tbody>
                                        <tr>
                                            <td>Assignment Fee</td>
                                            <td><NumberFormat value={this.props.job.AppraiserFee}  displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                        </tr>
                                        <tr>
                                            <td>Turn Time(weeks)</td>
                                            <td>{this.getTurnTimeWeeks(this.props.job.StartDate, this.props.job.EndDate)}</td>
                                        </tr>
                                        <tr>
                                            <td>Rentable Area</td>
                                            <td><NumberFormat value={this.props.job.RentableArea}  displayType={'text'} thousandSeparator={true}  /></td>
                                        </tr>
                                        <tr>
                                            <td>No. Of Units</td>
                                            <td><NumberFormat value={this.props.job.NoOfUnits}  displayType={'text'} thousandSeparator={true}  /></td>
                                        </tr>
                                        <tr>
                                            <td>Bidder</td>
                                            <td>{this.props.job.Originator}</td>
                                        </tr>
                           </tbody>
                        ) : 
                        (
                            <tbody>
                                    <tr>
                                        <td>Capitalization Rate</td>
                                        <td> <NumberFormat value={this.props.job.CapitalizationRate}  displayType={'text'} thousandSeparator={true}  /></td>
                                    </tr>
                                    <tr>
                                        <td>Vacancy Rate</td>
                                        <td><NumberFormat value={this.props.job.VacancyRate}  displayType={'text'} thousandSeparator={true}  /></td>
                                    </tr>
                                    <tr>
                                        <td>Market Rent</td>
                                        <td><NumberFormat value={this.props.job.MarketRent}  displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                    </tr>
                                    <tr>
                                        <td>Value P/Sf </td>
                                        <td> 
                                        <NumberFormat value={this.props.job.ValuePSF}  displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                    </tr>
                                    <tr>
                                        <td>Value P/unit </td>
                                        <td><NumberFormat value={this.props.job.ValuePUnit}  displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                    </tr>
                            </tbody>
                        )
                        }                          
                    
                </table>
            </div>
        );
        
    }

    getTurnTimeWeeks(startdate, enddate) {
        try
        {
            if (startdate == null || enddate == null)
                return 'NA';
            // The number of milliseconds in one week
            let ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
            // Convert both dates to milliseconds
            let date1_ms = new Date(startdate).getTime();
            let date2_ms = new Date(enddate).getTime();
            // Calculate the difference in milliseconds
            let difference_ms = Math.abs(date1_ms - date2_ms);
            // Convert back to weeks and return hole weeks
            return Math.floor(difference_ms / ONE_WEEK);
        }
        catch(e) {
            console.log(e);
           return null;
        }
    }
}