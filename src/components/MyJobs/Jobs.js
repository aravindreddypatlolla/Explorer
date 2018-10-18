import React, { Component } from 'react';
import '../../App.css';
import { withAuth } from '@okta/okta-react';
  

export default withAuth(class Jobs extends Component {
  constructor(props) {
    super(props);  
  }
  render() {
    return  ( 
            <iframe name="MarketSphere" src="https://jlltechnology.my.workfront.com/projects" className="iframeDisplay"  />        
    )         
  }
});
