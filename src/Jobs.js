import React, { Component } from 'react';
import './App.css';
import styledAppBar from './components/Common/HeaderBar';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { withAuth } from '@okta/okta-react';
import LeftBar from './components/Common/LeftBar';

const HeaderBar = styledAppBar();

export default withAuth(class Jobs extends Component {
  constructor(props) {
    super(props);  
  }

 
  render() {
    return  (
        <MuiThemeProvider theme={materialTheme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <div className="ui-shell">                
              <HeaderBar displayName="My Jobs" />
              <LeftBar />
              <iframe src="http://www.marketsphere.com/" className="iframeDisplay"  />
            </div>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>  
    )         
  }
});

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#D80027',
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: lightBlue.A200,
        // color: 'white',
      },
    },
    MuiPickersDay: {
      day: {
        color:  '#D80027',
      },
      selected: {
        backgroundColor: '#D80027',
      },
      current: {
        color:  '#D80027',
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: '#D80027',
      },
    },
  },
});