import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import classNames from 'classnames';
import { DatePicker } from 'material-ui-pickers';
import Select from 'react-select';

 

export class RangeFilter extends Component {
    constructor(props) {
        super(props);

        this.defaultVal = props.dataType === "date" ? null : "";
        this.customDates = [];
        this.label1 = props.label1Text == undefined || props.label1Text == null ? "Is Greater Than" : props.label1Text;
        this.label2 = props.label2Text == undefined || props.label2Text == null ? "Is Less Than" : props.label2Text;
        this.label3 = props.label3Text == undefined || props.label3Text == null ? "Is Between" : props.label3Text;
        this.label4 = props.label4Text == undefined || props.label4Text == null ? "Custom" : props.label4Text;
        this.customDisabled = props.label4Text == undefined || props.label4Text == null ? true : false
        this.state = {
            option: "between",
            valueOne: this.defaultVal,
            valueTwo: this.defaultVal,
            valueCustom: this.defaultVal,
            selectedValueCustom: this.defaultVal,
            customDateOptions: []
        }

        this.setcustomDateOptions();
    }

    setcustomDateOptions(){
       this.customDates = [{ Id:'1', Name: 'Last 1 Year' }, { Id:'2', Name: 'Last 2 Years' }, { Id:'3', Name: 'Last 3 Years' }, { Id:'5', Name: 'Last 5 Years' }];
       this.setState(Object.assign({}, this.state, { customDateOptions: this.customDates }));   
    }

    notifyChange = (range) => {
        this.props.onChange(range);
    }

    handleChange = event => {
        const option = event.target.value;
        let range = {};
        if(option === "greaterthan" || option === "lessthan") {
            range = Object.assign({}, this.state, { option: option, valueTwo: this.defaultVal });
        } 
        else if(option === "between") {
            range = Object.assign({}, this.state, { option: option });
        }
        else if(option === "custom") {
            range = Object.assign({}, this.state, { option: option, customDateOptions: this.customDates });
        }
        this.setState(range);
        this.notifyChange(range);
    };

    handleDateChangeOne = event => {    
        let range = Object.assign({}, this.state, { valueOne: event == null ? this.defaultVal : event.toISOString() });
        this.setState(range)
        this.notifyChange(range);
    }

    handleDateChangeTwo = event => {
        let range = Object.assign({}, this.state, { valueTwo: event == null ? this.defaultVal : event.toISOString() });
        this.setState(range)
        this.notifyChange(range);
    }

    handleDateChangeCustom = event => {
        var date = new Date();        
        date.setFullYear( date.getFullYear() - event.Id );
        let range = Object.assign({}, this.state, { selectedValueCustom: event, valueCustom: date.toISOString() });
        this.setState(range)
        this.notifyChange(range);
    }

    updateValueOne = event => {
        let range = Object.assign({}, this.state, { valueOne: event.target.value });
        this.setState(range)
        this.notifyChange(range);
    }

    updateValueTwo = event => {
        let range = Object.assign({}, this.state, { valueTwo: event.target.value });
        this.setState(range)
        this.notifyChange(range);
    }

    clearFilters = () => {
        let range = { option: null, valueOne: this.defaultVal, valueTwo: this.defaultVal, valueCustom: this.defaultVal };
        this.setState(range)
        this.notifyChange(range);
    }


    CustomTextField = (props)=> {       
        let inputProps = {...props }
        delete inputProps.error;
        delete inputProps.helperText;

        //this is just to suppress the react warning
        let onChange = event => { console.log("On Input Change"); }

        return(
            <input
                type="text"
                onClick={props.onClick}
                id={props.id} 
                value={props.value}
                onChange={onChange}
                disabled={props.disabled}
                placeholder="Date"
                {...props.inputProps} />
        )
    }

    render() {
        let clearClasses = classNames({
            "clear-filter": true,
            "clear-disabled": !this.state.option
        }); 

        return(
            <div className="filter">
                <div className="filter-title">
                    <h3>{this.props.title}</h3>
                    <span onClick={this.clearFilters.bind(this)} className={clearClasses}>Clear</span>
                </div>
                <div className="filter-inputs">
                    <RadioGroup
                        aria-label="range"
                        name={this.props.name}
                        value={this.state.option}
                        className="range-radios"
                        onChange={this.handleChange.bind(this)}>
                            <FormControlLabel value="greaterthan" control={<Radio />} label={this.label1} />
                            <FormControlLabel value="lessthan" control={<Radio />} label={this.label2} />
                            <FormControlLabel value="between" control={<Radio />} label={this.label3} />
                            { 
                                this.customDisabled === false ?
                                <FormControlLabel value="custom" control={<Radio />} label={this.label4} />
                                 : null                    
                            }
                    </RadioGroup>
                    { this.props.dataType === 'date' ? (
                        <div className="range-inputs">
                            <DatePicker label=""
                                        keyboard={true}                                        
                                        placeholder="Date"                                  
                                        // TextFieldComponent={this.CustomTextField}
                                        clearable maxDateMessage="Date must be less than today" 
                                        value={this.state.valueOne ? this.state.valueOne : null} 
                                        onChange={this.handleDateChangeOne.bind(this)} 
                                        disabled={!this.state.option || this.state.option == "custom"}
                                        format="MM/DD/YYYY"
                                        animateYearScrolling={false}       
                                        disableOpenOnEnter
                                        className="datePicker"                                                                  
                                        />
                            <DatePicker label=""
                                        keyboard={true}                                        
                                        placeholder="Date"  
                                        //TextFieldComponent={this.CustomTextField}
                                        clearable maxDateMessage="Date must be less than today" 
                                        value={this.state.valueTwo} 
                                        onChange={this.handleDateChangeTwo.bind(this)} 
                                        disabled={this.state.option != "between"}
                                        format="MM/DD/YYYY"
                                        animateYearScrolling={false} 
                                        disableOpenOnEnter
                                        className="datePicker" />
                            <Select
                                        name="Custom"
                                        value={this.state.selectedValueCustom}
                                        onChange={this.handleDateChangeCustom.bind(this)}
                                        isMulti={false}
                                        options={this.state.customDateOptions}
                                        getOptionLabel= {(o)=> o.Name}
                                        getOptionValue={(o)=> o.Id } 
                                        isDisabled={this.state.option != "custom"} 
                                        className="customDate"/>                            
                        </div>
                    ): (
                        <div className="range-inputs">
                            <input 
                                type="text" 
                                value={this.state.valueOne} 
                                onChange={this.updateValueOne.bind(this)} 
                                placeholder={this.props.placeholderOne} 
                                disabled={!this.state.option } />
                            <input 
                                type="text" 
                                value={this.state.valueTwo} 
                                onChange={this.updateValueTwo.bind(this)} 
                                placeholder={this.props.placeholderTwo} 
                                disabled={this.state.option != "between"} />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}