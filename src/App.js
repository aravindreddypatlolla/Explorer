import React, { Component } from 'react';
import { Security, ImplicitCallback } from '@okta/okta-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Jobs2 from './Jobs';
import Jobs from './components/MyJobs/JobsPage';
import ConflictCheck from './components/ConflictCheck/ConflictCheckPage';
import MarketSphere from './components/MarketSphere/MarketSpherePage';
import SalesComp from './components/SalesComp/SalesCompPage';
import Trepp from './components/Trepp/TreppPage';
import * as tokenService from './services/TokenService';
 
const config = tokenService.oktaConfig();

class App extends Component {
  render() {
    return (
      <Router>
        <Security issuer={config.issuer}
                  client_id={config.client_id}
                  redirect_uri={config.redirect_uri}
                  response_type={config.response_type}                      
        >
          <Route path='/VAS' exact={true}  component={Home} />
          <Route path='/VAS/implicit/callback' component={ImplicitCallback} />
          <Route path='/Jobs' exact={true}  component={Jobs} />
          <Route path='/ConflictCheck' exact={true}  component={ConflictCheck} />
          <Route path='/MarketSphere' exact={true}  component={MarketSphere} />
          <Route path='/SalesComp' exact={true}  component={SalesComp} />
          <Route path='/Trepp' exact={true}  component={Trepp} />
        </Security>
      </Router>     
    );
  }
}

export default App;
