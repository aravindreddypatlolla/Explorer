import axios from 'axios';
import * as TokenService from './TokenService';

//import fileSaver from 'file-saver';
var FileSaver = require('file-saver');

export function getAccessToken() {   
     return 'Bearer ' + TokenService.getApigeeToken();
 }

export function getUserName() {   
    let tokens = localStorage.getItem('okta-token-storage');   
    var obj = JSON.parse(tokens);    
    if (obj !== null && obj.idToken !== null )
        return obj.idToken.claims.name;
    else
        return null;
}


export function getUserType() {   
    let userType = "Bidder"; //default value        
    if (sessionStorage.getItem("VAS.userType") !== null && sessionStorage.getItem("VAS.userType") !== undefined 
        && sessionStorage.getItem("VAS.userType") !== "")
    {
        userType = sessionStorage.getItem("VAS.userType");  
    }  
    return userType;
}

export function setUserType(userType) {   
    if (userType === null || userType === undefined || userType === "")
        userType = "Bidder"; //default value       

    sessionStorage.setItem("VAS.userType", userType);   
   
}

export async function getJobs(filter) {
    if (filter.userType === null || filter.userType === undefined)
        filter.userType = getUserType();

    let header = await TokenService.getAccessTokenHeader();

    return axios.post(TokenService.getApiBaseURL() + 'job/search', filter, { headers: header })
        .then((res)=> res.data.Data);
}

export async function exportJobsToExcel(filter) {
    //http headers are not passing data correctly.
    filter.userName = getUserName();
    let header = await TokenService.getAccessTokenHeader();
    var exportRequest = {"exportType" :"Jobs","exportFormat":"excel", "filter": JSON.stringify(filter),"fileName":"jobs"};
    return axios.post(TokenService.getVASApiBaseURL() + 'api/export/export', exportRequest,{ responseType:'arraybuffer' })
                    .then((res)=> { FileSaver.saveAs(new Blob([res.data], {type: "application/vnd.ms-excel"}), "Jobs.xlsx"); 
    });   
}

export async function lookupClients(filter) {
    let header = await TokenService.getAccessTokenHeader();
    return axios.get(TokenService.getApiBaseURL() + 'company/getCompanyList?name=' + filter.name, { headers: header })
        .then((res)=> res.data.Data);
}
