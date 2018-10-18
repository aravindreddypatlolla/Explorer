import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import { RangeFilter } from '../Common/RangeFilter';
import { SelectionFilter } from '../Common/SelectionFilter';
import classNames from 'classnames';
import * as propertyService from '../../services/PropertyService';
import * as jobService from '../../services/JobService';
import * as locationService from '../../services/LocationService';
import { emptyFilters } from '../../utils/jobFilterUtils';
import posed from 'react-pose';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { Checkbox } from '@material-ui/core';
import filterImage  from '../Common/images/filterimage.PNG';
import filterhimage  from '../Common/images/filterh.png';
import Switch from "react-switch";

const _ = require("lodash"); 


const FilterContainer = posed.div({
    open: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, duration: 100 } },
    closed: { opacity: 0, y: 20 }
});

const WrapForAnime = (Filter) => {
    return (props) => (
        <FilterContainer> 
            <Filter {...props} />
        </FilterContainer>
    );
}

const RangeFilterAnimated = WrapForAnime(RangeFilter);
const SelectionFilterAnimated = WrapForAnime(SelectionFilter);

export class JobFilters extends Component {
    constructor(props) {
        super(props);

        this.allPropertyTypes = [];
        this.allMSAMarkets = [];
        this.allStates = [];
        this.allCounties = [];
        this.allCities = [];        
        this.showFilters = false;

        this.state = { 
            showFilters: this.showFilters, 
            propertyMajorTypeLookup: [], 
            propertySubTypeLookup: [], 
            propertyTypeLookup: [], 
            msaMarketLookup: [],
            statesLookup:[],
            countiesLookup:[],
            citiessLookup:[],
            selectedTab: 0,
            filter: emptyFilters,
            checkedRightOfWay: false
        }    
      
        jobService.setUserType("Bidder");  
        locationService.logUserInfo();
        this.getPropertyTypes();
        this.getMSAMarkets();
        this.getStates();  
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.filter){
            this.setState(Object.assign({}, this.state, { showFilters: this.showFilters, 
                filter: Object.assign({}, this.state.filter, 
                { 
                    msaMarket: nextProps.filter.msaMarket,
                    latitude: nextProps.filter.latitude,
                    longitude: nextProps.filter.longitude,
                    msaByZipCode: nextProps.filter.msaByZipCode
                })}));
        }
    }

    toggleFilter() {
        this.showFilters =  !this.state.showFilters;
        this.setState(Object.assign({}, this.state, { showFilters: this.showFilters }));
    }

    closeFilters() {
        this.showFilters = false;
        this.setState(Object.assign({}, this.state, { showFilters: this.showFilters }));
    }

    handleChange(checked) {
        let userTypeSelected = 'Bidder'
        if (checked == true)
        {
          userTypeSelected = 'Appraiser'
        }
        this.setState(Object.assign({}, this.state, { usertypeChecked: checked }));
        this.setState(Object.assign({}, this.state, { filter: Object.assign({}, this.state.filter, { userType: userTypeSelected })}));  
        //todo - pass as react 
        jobService.setUserType(userTypeSelected);      
      }


    toFromTo = (range) => {
        if(range.option == 'between') {
            return { from: range.valueOne, to: range.valueTwo }; 
        } else if(range.option == 'greaterthan') {
            return { from: range.valueOne, to: null }; 
        } else if(range.option == 'lessthan') {
            return { from: null, to: range.valueOne }; 
        } else if(range.option == 'custom') {
            return { from: range.valueCustom, to: null }; 
        }else {
            return { from: null, to: null }; 
        }
    }

    setRange = (attrib, range) => {
        this.setState(Object.assign({}, this.state, { filter: Object.assign({}, this.state.filter, { [attrib]: this.toFromTo(range) })}));
    }

    setPropertyMajorTypes = options => {
        // 1. Refresh the Types
        let filteredTypeLookup = _.map(options, (mt)=> ({ label: mt.Name, options: mt.SubItems }));
        let flattenedTypes = _.flatten(_.map(filteredTypeLookup, (l)=> l.options));
        let filteredTypeSelection =_.filter(this.state.filter.propertyType, (t)=> _.some(flattenedTypes, { Id: t.Id }));

        // 2. Refresh the Sub Types
        let filteredSubTypeLookup = _.map(filteredTypeSelection, (st)=> ({ label: st.Name, options: st.SubItems }));
        let flattenedSubTypes = _.flatten(_.map(filteredSubTypeLookup, (l)=> l.options));
        let filteredSubTypeSelection = _.filter(this.state.filter.propertySubType, (t)=> _.some(flattenedSubTypes, { Id: t.Id }));

        this.setState(Object.assign({}, this.state, { propertyTypeLookup: filteredTypeLookup, 
                                                        propertySubTypeLookup: filteredSubTypeLookup,
                                                        filter: Object.assign({}, this.state.filter, { propertyMajorType: options, 
                                                                                                        propertyType: filteredTypeSelection,
                                                                                                        propertySubType: filteredSubTypeSelection }) }));
    }

    setPropertyTypes = options => {
        // 1. Refresh the Types
        let filteredSubTypeLookup = _.map(options, (st)=> ({ label: st.Name, options: st.SubItems }));
        let flattenedSubTypes = _.flatten(_.map(filteredSubTypeLookup, (l)=> l.options));
        let filteredSubTypeSelection = _.filter(this.state.filter.propertySubType, (t)=> _.some(flattenedSubTypes, { Id: t.Id }));

        this.setState(Object.assign({}, this.state, { propertySubTypeLookup: filteredSubTypeLookup,
                                                      filter: Object.assign({}, this.state.filter, { propertyType: options,
                                                                                                     propertySubType: filteredSubTypeSelection }) }));
    }

    setPropertySubTypes = options => {
        this.setState(Object.assign({}, this.state, { filter: Object.assign({}, this.state.filter, { propertySubType: options }) }));
    }

    setMarkets = options => {
        this.setState(Object.assign({}, this.state, { filter: Object.assign({}, this.state.filter, { msaMarket: options })}));
        if (options &&  options.length > 0)
        {
            this.getCities(this.state.filter.states, this.state.filter.counties, options);
        }
    }

    setStates = options => {
        this.setState(Object.assign({}, this.state, { filter: Object.assign({}, this.state.filter, { states: options })}));     
        if (options &&  options.length > 0)
        {
            this.getCounties(options);
            this.getMSAMarketsForStates(options);
        }
        else
        {
            this.setState(Object.assign({}, this.state, { filter: Object.assign({}, this.state.filter, { states: options, counties: options, cities: options })}));
            this.getMSAMarkets();
        }

    }

    setCounties = options => {
        this.setState(Object.assign({}, this.state, { filter: Object.assign({}, this.state.filter, { counties: options })}));
        if (options &&  options.length > 0)
            this.getCities(this.state.filter.states, options, this.state.filter.msaMarket);
        else
        {
            this.setState(Object.assign({}, this.state, { filter: Object.assign({}, this.state.filter, { counties: options, cities: options })}));
        }
    }

    setCities = options => {
        this.setState(Object.assign({}, this.state, { filter: Object.assign({}, this.state.filter, { cities: options })}));
    }


    setClients = options => {
        this.setState(Object.assign({}, this.state, { filter: Object.assign({}, this.state.company, { company: options })}));
    }

    lookupClients = input => {
        if(!input || input.length < 3) {
            return;
        }

        return jobService.lookupClients({ name: input });
    }

    assignIds = items => {
        _.forEach(items, (mt)=> {
            mt.Id =  _.uniqueId()
            
            if(mt.SubItems) {
                _.forEach(mt.SubItems, (st)=> {
                    st.Id =  _.uniqueId();
                    if(st.SubItems) {
                        _.forEach(st.SubItems, (t)=> {
                            t.Id =  _.uniqueId();
                        });
                    }
            });
          }
        });

        return items;        
    }

    clearAllFilters = () => {
        this.setState(Object.assign({}, this.state, { filter: emptyFilters }));
    }

    handleTabChange = (event, index) => {
        this.setState(Object.assign({}, this.state, { selectedTab: index }));
    }

    handleSwapTabChange = index => {
        this.setState(Object.assign({}, this.state, { selectedTab: index }));
    }

    applyFilters = () => {
        //check that subject property is selected
        if(!this.state.filter.msaByZipCode || !this.state.filter.latitude || !this.state.filter.longitude) {
            this.props.notify("success", {
                title: 'Please select subject property',
                message: 'Subject property is required for system to find the jobs near it.',
                autoDismiss: 5,
            });

            return;
        }
        this.showFilters = false;
        this.props.applyJobFilter(this.state.filter);
    }

    getPropertyTypes() {
        propertyService.getPropertyTypes().then((res)=> {
            this.allPropertyTypes = this.assignIds(res);
            //let majorTypes = _.map(this.allPropertyTypes, (t)=> ({Id: t.Id, Name: t.Name}));
            this.setState(Object.assign({}, this.state, { propertyMajorTypeLookup: this.allPropertyTypes }));
        });
    }
    
    getMSAMarkets() {
        propertyService.getMSAMarkets().then((res)=> {
            this.allMSAMarkets = res;
            this.setState(Object.assign({}, this.state, { msaMarketLookup: this.allMSAMarkets }));
        });
    }

    getMSAMarketsForStates(states) {
        propertyService.getMSAMarketsForStates(states).then((res)=> {
            this.allMSAMarkets = res;
            this.setState(Object.assign({}, this.state, { msaMarketLookup: this.allMSAMarkets }));
        });
    }

    getStates(){
        locationService.getStates().then((res)=> {
            this.allStates = this.assignIds(res);
            this.setState(Object.assign({}, this.state, { statesLookup: this.allStates }));
        });
    }

    getCounties(states) {
        locationService.getCounties(states).then((res)=> {         
            this.allCounties = this.assignIds(res);
            this.setState(Object.assign({}, this.state, { countiesLookup: this.allCounties }));
        });
    }

    getCities(states, counties, msaMarket) {
        this.location = [];
        this.location.state = states;
        this.location.county = counties;
        this.location.msaMarket = msaMarket;              
        locationService.getCities(this.location).then((res)=> {         
            this.allCities = this.assignIds(res);
            this.setState(Object.assign({}, this.state, { citiesLookup: this.allCities }));
        });
    }

    handleUserTypeChange = event => {       
        const option = event.target.value;        
        this.setState(Object.assign({}, this.state, { filter: Object.assign({}, this.state.filter, { userType: option })}));  
        //todo - pass as react 
        jobService.setUserType(option);
    };

    handleRightOfWayChange = name => event => {
        //this.setState({ [name]: event.target.checked });
        this.setState(Object.assign({}, this.state, { filter: Object.assign({}, this.state.filter, { includeRightOfWay: event.target.checked })})); 
      };
     

    SidePanel = posed.div({
        open: {
            x: "0%",
            delayChildren: 300,
            staggerChildren: 50
        },
        closed: {
            delay: 300,
            staggerChildren: 20,
            x: "-100%"
        }
    });

    render() { 
        let overlayClasses = classNames({
            "filter-overlay": true
            //"hidden": !this.state.showFilters
        });

        return(
            <div className="job-filter">
                <img src={filterImage} onClick={this.toggleFilter.bind(this)} title="Filters" className="filterImage" />    
                <this.SidePanel pose={this.state.showFilters ? "open" : "closed"} className={overlayClasses}>
                    <Tabs fullWidth className="filterHeaderTab">
                        <img src={filterhimage} className="filterListIcon" /> 
                        <div className="filterListText">Filters</div>                        
                    </Tabs> 
                    <Tabs
                        value={this.state.selectedTab}
                        onChange={this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth>
                            <Tab label="Market & Area" />
                            <Tab label="Building Details" />
                            <Tab label="Job Details" />
                    </Tabs>                    
                    <SwipeableViews
                            index={this.state.selectedTab}
                            onChangeIndex={this.handleSwapTabChange} 
                            className="filter-container">                            
                                <div>
                                    <SelectionFilterAnimated options={this.state.statesLookup}    selectedOptions={this.state.filter.states} title="State" name="states" onChange={this.setStates.bind(this)} />
                                    <SelectionFilterAnimated options={this.state.msaMarketLookup} selectedOptions={this.state.filter.msaMarket} title="Markets" name="markets" onChange={this.setMarkets.bind(this)} />                                    
                                    <SelectionFilterAnimated options={this.state.countiesLookup}  selectedOptions={this.state.filter.counties} title="County" name="county" onChange={this.setCounties.bind(this)} />
                                    <SelectionFilterAnimated options={this.state.citiesLookup}    selectedOptions={this.state.filter.cities} title="City" name="city" onChange={this.setCities.bind(this)} />
                                </div>
                                <div>
                                    <SelectionFilterAnimated options={this.state.propertyMajorTypeLookup} selectedOptions={this.state.filter.propertyMajorType} title="Property Major Type" name="majortypes" onChange={this.setPropertyMajorTypes.bind(this)} />
                                    <SelectionFilterAnimated options={this.state.propertyTypeLookup} selectedOptions={this.state.filter.propertyType} title="Property Type" name="types" onChange={this.setPropertyTypes.bind(this)} />
                                    <SelectionFilterAnimated options={this.state.propertySubTypeLookup} selectedOptions={this.state.filter.propertySubType} title="Property Sub Type" name="subtypes" onChange={this.setPropertySubTypes.bind(this)} />
                                    <RangeFilterAnimated title="Building Size" name="buildingsize" placeholderOne="Building Size" placeholderTwo="Building Size" onChange={this.setRange.bind(this, 'buildingSize')} />
                                    <RangeFilterAnimated title="Land Area" name="landarea" placeholderOne="Area(ac)" placeholderTwo="Area(ac)" onChange={this.setRange.bind(this, 'landArea')} />
                                    <RangeFilterAnimated title="Year Built"  name="yarbuilt" placeholderOne="Year Built" placeholderTwo="Year Built" onChange={this.setRange.bind(this, 'yearBuilt')} />
                                    <RangeFilterAnimated title="Number of Units"  name="noofunits" placeholderOne="Units" placeholderTwo="Units" onChange={this.setRange.bind(this, 'noOfUnits')} />
                                    <RangeFilterAnimated title="Number of Tenants"  name="nooftenants" placeholderOne="Tenants" placeholderTwo="Tenants" onChange={this.setRange.bind(this, 'noOfTenants')} />
                                </div>
                                <div>
                                    <SelectionFilterAnimated asyncOptions={this.lookupClients.bind(this)} selectedOptions={this.state.filter.company} title="Client" name="client" onChange={this.setClients.bind(this)} />
                                    <RangeFilterAnimated dataType="date" label1Text="Newer Than" label2Text="Older Than" label4Text="Custom" title="Creation Date" name="createddate" placeholderOne="Creation Date" placeholderTwo="Creation Date" onChange={this.setRange.bind(this, 'createdDate')} />
                                    <RangeFilterAnimated dataType="date" label1Text="Newer Than" label2Text="Older Than" label4Text="Custom" title="Inspection Date" name="inspectiondate" placeholderOne="Inspection Date" placeholderTwo="Inspection Date" onChange={this.setRange.bind(this, 'inspectionDate')} />
                                    {   
                                        //as discussed commenting report date for now.                                 
                                        // <RangeFilterAnimated dataType="date" label1Text="Newer Than" label2Text="Older Than" label4Text="Custom" title="Report Date" name="reportdate" placeholderOne="Report Date" placeholderTwo="Report Date" onChange={this.setRange.bind(this, 'reportDate')} />
                                    }
                                    <FormControlLabel control={<Checkbox value="checkedRightOfWay" onChange={this.handleRightOfWayChange('checkedRightOfWay')} />} label="Include Right Of Way" className="checkBoxRightOfWay" />
                                </div>                            
                    </SwipeableViews>
                    <div className="filter-actions">
                        <div onClick={this.clearAllFilters.bind(this)} className="clear"><span>Clear All</span></div>
                        <div onClick={this.closeFilters.bind(this)} className="cancel"><span>Cancel</span></div>
                        <div onClick={this.applyFilters.bind(this)}  className="apply"><span>Apply Changes</span></div>
                    </div>
                </this.SidePanel>
                <span className="userType-radios">
                    <span>Bidder</span>
                        <Switch
                            checked={this.state.usertypeChecked}
                            onChange={this.handleChange.bind(this)}
                            onColor="#86d3ff"
                            onHandleColor="#2693e6"
                            handleDiameter={20}
                            uncheckedIcon={false}
                            checkedIcon={true}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={15}
                            width={50}
                            top={20}
                            className="react-switch"
                            id="material-switch"
                        />
                     <span> Appariser</span>
                     <Button size="small"  variant="outlined" color="primary" onClick={this.applyFilters.bind(this)} >
                        Refresh                    
                     </Button>   
                   { /*<RadioGroup
                        name="userType"                      
                        value={this.state.filter.userType}
                        onChange={this.handleUserTypeChange.bind(this)}>
                        <FormControlLabel value="Bidder" control={<Radio />} label="Bidder"  />
                        <FormControlLabel value="Appraiser" control={<Radio />} label="Appraiser" />  
                        <Button size="small"  variant="outlined" color="primary" onClick={this.applyFilters.bind(this)} >
                        Refresh                    
                        </Button>                             
                    </RadioGroup>*/
                   }
                </span>
            </div>
        )
    }
}