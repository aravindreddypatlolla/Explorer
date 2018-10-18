import React, { Component } from 'react';
import Select, { Async } from 'react-select';
import classNames from 'classnames';

export class SelectionFilter extends Component {
    constructor(props) {
        super(props);
    }

    notifyChange = (selection) => {
        this.props.onChange(selection);
    }

    handleChange = (selection) => {
        //this.setState(Object.assign({}, this.state, { selectedOptions: selection }))
        this.notifyChange(selection);
    }

    clearFilters = () => {
        //this.setState({ selectedOptions: null })
        this.notifyChange([]);
    }

    render() {
        let clearClasses = classNames({
            "clear-filter": true,
            "clear-disabled": !this.props.selectedOptions || this.props.selectedOptions.length == 0
        }); 

        return(
            <div className="filter">
                <div className="filter-title">
                    <h3>{this.props.title}</h3>
                    <span onClick={this.clearFilters.bind(this)} className={clearClasses}>Clear</span>
                </div>
                <div className="filter-inputs">
                    {this.props.asyncOptions ? (
                        <Async
                            className="filter-inputs-select"
                            name={this.props.name}
                            value={this.props.selectedOptions}
                            onChange={this.handleChange}
                            isMulti={true}
                            loadOptions={this.props.asyncOptions}
                            getOptionLabel= {(o)=> o.Name}
                            getOptionValue={(o)=> o.Id }
                        />
                    ):
                    (
                        <Select
                            className="filter-inputs-select"
                            name={this.props.name}
                            value={this.props.selectedOptions}
                            onChange={this.handleChange}
                            isMulti={true}
                            options={this.props.options}
                            getOptionLabel= {(o)=> o.Name}
                            getOptionValue={(o)=> o.Id }
                    />)}  
                </div>
            </div>
        );
    }
}