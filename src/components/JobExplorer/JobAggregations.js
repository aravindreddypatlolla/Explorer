import React, { Component } from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import * as jobService from '../../services/JobService';
import NumberFormat from 'react-number-format';

export class JobAggregations extends Component {
    state = {
        checkedIncImages: true
      };

    onExport() {       
        this.props.filter.excludeImages = !this.state.checkedIncImages;        
        this.props.exportJobsToExcel(this.props.filter);
    }

    getUserType() {
        return jobService.getUserType();
    }

    setExcludeImages(event){       
        this.setState({ checkedIncImages: event.target.checked });
        this.props.filter.excludeImages = !this.state.checkedIncImages;
    }

    displayValue(val){
        if (val == undefined || val == null || val == '')
         return ' n/a ';
        else
         return val;
    }
    render(){
               
        if (this.props.filter.excludeImages === undefined)
            this.props.filter.excludeImages = false;

        let aggClasses = classNames({
            aggregations: true,
            hidden: !this.props.jobs || this.props.jobs.length === 0
        });

        return(
            <div className={aggClasses}>  
                { 
                this.getUserType() === "Bidder" ?
                (  
                    <div>     
                        <div className="action-export">  
                            <span className="exportToExcel">EXPORT TO EXCEL</span>
                            <div className="chkPictures">
                                <input type="checkbox" onChange={this.setExcludeImages.bind(this)}
                                checked={this.state.checkedIncImages} title="Include Pictures" />Include Pictures
                            </div>
                            <Button size="small" variant="contained" color="primary" className="button" onClick={this.onExport.bind(this)}>
                            Export                    
                            </Button>
                        </div>  
                        <div className="stat">
                            <strong>{this.props.aggregation.NoOfJobs}</strong>
                            <span>Number of Jobs</span>
                        </div>
                    
                        <div className="stat">
                            <strong>{this.props.aggregation.AverageTurnTimeWeeks}</strong>
                            <span>Avg Turn Time (Weeks)</span>
                        </div>
                        <div className="stat">
                            <strong><NumberFormat value={this.props.aggregation.AverageFees}  isNumericString="true"  displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            </strong>
                            <span>Avg Fees</span>        
                        </div>
                        <div className="stat">
                            <strong><NumberFormat value={this.props.aggregation.MedianFees}  isNumericString="true"  displayType={'text'} thousandSeparator={true} prefix={'$'} /></strong>
                             <span>Median Fees</span>        
                        </div>  
                    </div> 
                ) :
                (
                    <div>     
                        <div className="action-export">  
                            <span className="exportToExcel">EXPORT TO EXCEL</span>
                            <div className="chkPictures">
                                <input type="checkbox" onChange={this.setExcludeImages.bind(this)}
                                defaultChecked title="Include Pictures" />Include Pictures
                            </div>
                            <Button size="small" variant="contained" color="primary" className="button" onClick={this.onExport.bind(this)}>
                            Export                    
                            </Button>
                        </div>  
                        <div className="stat">
                            <strong>{this.props.aggregation.NoOfJobs}</strong>
                            <span>Number of Jobs</span>
                        </div>
                        <div className="stat">
                            <strong><NumberFormat value={this.props.aggregation.MedianCapitalization} isNumericString="true"   displayType={'text'} thousandSeparator={true} suffix="%"   /></strong>
                            <span>Median Capitalization Rate</span>
                        </div>                    
                        <div className="stat">
                            <strong><NumberFormat value={this.props.aggregation.MedianVacancyRate}   displayType={'text'}  thousandSeparator={true} suffix="%" /></strong>
                            <span>Median Vacancy Rate</span>
                        </div>
                        <div className="stat">
                            <strong><NumberFormat value={this.displayValue(this.props.aggregation.MedianValuePsf)} isNumericString="true"  displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            </strong>
                            <span>Median Value PSf</span>        
                        </div>
                        <div className="stat">
                            <strong><NumberFormat value={this.displayValue(this.props.aggregation.MedianValuePunit)} isNumericString="true"  displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            </strong>
                            <span>Median Value PUnit</span>        
                        </div>    
                        <div className="stat">
                            <strong><NumberFormat value={this.displayValue(this.props.aggregation.MedianExpensesPsf)} isNumericString="true"  displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            </strong>
                            <span>Median Expenses PSf</span>        
                        </div>
                        <div className="stat">
                            <strong><NumberFormat value={this.displayValue(this.props.aggregation.MedianExpensesPunit)} isNumericString="true"   displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            </strong>
                            <span>Median Expenses PUnit</span>        
                        </div>   
                    </div>
                )
                }
            </div>
        )
    }
}