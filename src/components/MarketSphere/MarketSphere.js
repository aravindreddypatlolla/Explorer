import React, { Component } from 'react';
import '../../App.css';
import { withAuth } from '@okta/okta-react';
  

export default withAuth(class MarketSphere extends Component {
  constructor(props) {
    super(props);  
  }
  render() {
    return  ( 
            <iframe name="MarketSphere" src="https://apps.jll.com/MarketSphere/Home/Search" className="iframeDisplay"  />
        
    )         
  }
});
