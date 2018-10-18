import React, { Component } from 'react';
import './App.css';
//import { JobExplorerPage } from './components/JobExplorer/JobExplorerPage';
import JobExplorerContainer from './containers/JobExplorerContainer';
import { makeStore } from './store';
import createHistory from 'history/createHashHistory';
import { Provider } from 'react-redux';
import styledAppBar from './components/Common/HeaderBar';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { withAuth } from '@okta/okta-react';
import Layout from './components/Common/Layout';

const HeaderBar = styledAppBar();
//const history = createHistory();
//let store = makeStore(history);

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
    this.login = this.login.bind(this);
    //this.logout = this.logout.bind(this);
    this.store = this.createStore();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    // Redirect to '/' after login
    this.props.auth.login('/VAS');
  }



  createStore(){
    const history = createHistory();
    let store = makeStore(history);
    return store;
  }

  render() {

    if (this.state.authenticated === null) return null;
    
    return this.state.authenticated ?
      (
        <Provider store={this.store}>
        <MuiThemeProvider theme={materialTheme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <div className="ui-shell">                
              <Layout displayName="Appraisal Explorer" />  
            </div>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </Provider>         
    ) :
      this.login();
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