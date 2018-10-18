import axios from 'axios';
import * as TokenService from './TokenService';

export function getAccessToken() {   
    return 'Bearer ' + TokenService.getApigeeToken();
}

export async function getStates() {    
    let header = await TokenService.getAccessTokenHeader();
    return axios.get(TokenService.getApiBaseURL() + 'location/GetStates', 
    { headers: header })
    .then((res)=> res.data.Data);
}

export async function getCounties(selectedStates) {
    let header = await TokenService.getAccessTokenHeader();
    return axios.post(TokenService.getApiBaseURL() + 'location/GetCounties', selectedStates, 
    { headers: header } )
    .then((res)=> res.data.Data);
}

export async function getCities(location) {   
    let header = await TokenService.getAccessTokenHeader(); 
    return axios.post(TokenService.getApiBaseURL() + 'location/GetCities', {state: location.state, county:location.county, msaMarket: location.msaMarket}, 
    { headers: header })
    .then((res)=> res.data.Data);
}

//need to move to log service
export async function logUserInfo() {   
    let header = await TokenService.getAccessTokenHeader(); 
    return axios.post(TokenService.getApiBaseURL() + 'log/LogUserInfo', JSON.stringify(TokenService.getOktaUserName()), 
    { headers: header })
    .then((res)=> res.data.Data);
}