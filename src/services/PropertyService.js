import axios from 'axios';
import * as TokenService from './TokenService';


export function getAccessToken() {   
     return 'Bearer ' + TokenService.getApigeeToken();
 }
 

export async function getPropertyTypes() {
    let header = await TokenService.getAccessTokenHeader();
    return axios.get(TokenService.getApiBaseURL() + 'property/GetPropertyAllTypes' , 
    { headers: header })
        .then((res)=> res.data.Data);
}

export async function getMSAMarkets() {     
    let header = await TokenService.getAccessTokenHeader();
    return axios.get(TokenService.getApiBaseURL() + 'market/GetMarketList' , 
    { headers: header })
    .then((res)=> res.data.Data);
}

export async function getMSAMarketsForStates(selectedStates) {
    let header = await TokenService.getAccessTokenHeader();
    return axios.post(TokenService.getApiBaseURL() + 'market/GetMarketListForStates', selectedStates, 
    { headers: header })
    .then((res)=> res.data.Data);
}