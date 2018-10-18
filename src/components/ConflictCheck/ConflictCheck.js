import React, { Component } from 'react';
import '../../App.css';
import { withAuth } from '@okta/okta-react';
  

export default withAuth(class ConflictCheck extends Component {
  constructor(props) {
    super(props);  
  }
  render() {
    return  ( 
            <iframe name="ConflickCheck" src="https://analytics4.jll.com/#/site/gfm/views/ConflictCheckTool/ConflictCheckTool?:iid=1" className="iframeDisplay"  />
        
    )         
  }
});
