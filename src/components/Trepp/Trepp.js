import React, { Component } from 'react';
import '../../App.css';
import { withAuth } from '@okta/okta-react';
  

export default withAuth(class Trepp extends Component {
  constructor(props) {
    super(props);  
  }
  render() {
    return  ( 
            <iframe name="Trepp" src="https://apps.joneslanglasalle.com/Home/RSReportEngine/showreport.aspx?report=TREPP_Property_Report.rdl&appkey=291&ParamKey=254&__showReport=true"
             className="iframeDisplay"  />
        
    )         
  }
});
