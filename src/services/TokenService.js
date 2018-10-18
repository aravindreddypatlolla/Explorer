import axios from 'axios';
import queryString from 'qs'; 
import * as config from './config';

const env = config.getEnvironment(); 

const defaultConfig = {
    clientId: 'MDxMmFkBybGOpxjI5qo1GLTZntTR70uG',
    responseType: 'token',
    sessionType: 'jll',
    url: 'https://dev.jllapi.com/oauth2/v1/implicit?session=jll&response_type=token&client_id=uZOBLaVGoEXVfJ8IY3fQeUKAWuOi9tKG', 
  };

export async function getAccessTokenHeader() {   
    let tokenToPass = await getApigeeToken();
    let header = {
            "Authorization": "Bearer " + tokenToPass,
            "Content-Type": "application/json"
        };
    return header;
 }

export function getAccessToken() {  
    let tokens = localStorage.getItem('okta-token-storage');   
    var obj = JSON.parse(tokens);     
    return 'Bearer ' + obj.accessToken.accessToken;
}

export function getOktaUserName() {  
    let tokens = localStorage.getItem('okta-token-storage');   
    var obj = JSON.parse(tokens);     
    return obj.idToken.claims.name;;
}

//get session and login infomation for current logged on user
export function getUserOKTASession() {
    let currentOKTASessionInfoAPIURL = "https://jllpoc.oktapreview.com/api/v1/sessions/me";
    if (env === "prod" || env === "PROD")
    {
        currentOKTASessionInfoAPIURL = "https://jll.okta.com/api/v1/sessions/me";
    }
    return axios.get(currentOKTASessionInfoAPIURL, {withCredentials: true})
    .then((res)=> res.data);
};

export function clearApigeeToken() {    
    sessionStorage.removeItem("VAS.apigee-token"); 
}

export function getVASApiBaseURL(){
    return "";
}

export function getApiBaseURL(){
    //return "/api/";
    if (env === "prod" || env === "PROD")
    {
        return "https://prod.jllapi.com/vas/v1/";
    }
    else if (env === "qa" || env === "QA")
    {
        return "https://qa.jllapi.com/vas/v1/";
    }
    else
    {
        return "https://dev.jllapi.com/vas/v1/";
    }
}

export function getApigeeURL(){
    if (env === "prod" || env === "PROD")
    {
        return "https://prod.jllapi.com/oauth2/v1/implicit?session=jll&response_type=token&client_id=wpG8Twyv6YA5GtFHnxYbnwXFfXRmv2GE";
    }
    else if (env === "qa" || env === "QA")
    {
        return "https://qa.jllapi.com/oauth2/v1/implicit?session=jll&response_type=token&client_id=uZOBLaVGoEXVfJ8IY3fQeUKAWuOi9tKG";
    }
    else
    {
        return "https://dev.jllapi.com/oauth2/v1/implicit?session=jll&response_type=token&client_id=uZOBLaVGoEXVfJ8IY3fQeUKAWuOi9tKG";
    }
}

export function oktaConfig()
{
    if (env === "prod" || env === "PROD")
    {
        return {
            issuer: 'https://jll.okta.com',
            redirect_uri: window.location.origin + '/VAS/implicit/callback',
            client_id: '0oa1ga2sz01Zq8uaR0h8',
            response_type: ['id_token', 'token'],
            scope: ['openid', 'profile', 'email'] 
          };
    }
    else if (env === "qa" || env === "QA")
    {
        return {
            issuer: 'https://jllpoc.oktapreview.com',
            redirect_uri: window.location.origin + '/VAS/implicit/callback',
            client_id: '0oafjfj5gp4rKF2UA0h7',
            response_type: ['id_token', 'token'],
            scope: ['openid', 'profile', 'email'] 
        };
    }
    else
    {
        return {
            issuer: 'https://dev-878040.oktapreview.com/oauth2/default',
            redirect_uri: window.location.origin + '/VAS/implicit/callback',
            client_id: '0oafn48mcrOtcmyuA0h7',
            response_type: ['id_token', 'token'],
            scope: ['openid', 'profile', 'email'] 
          };
    }
}
 
export async function getApigeeToken() {    
    var _token =  sessionStorage.getItem("VAS.apigee-token");    
    if (_token !== null && _token !== undefined && _token !== "")
    {
        return _token;  
    }  
    return getOAuthToken();   
}

export function setApigeeToken(input) {
    var oAuthTokenURL = getApigeeURL();
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      };           
    return axios.post(oAuthTokenURL, input, axiosConfig)
    .then((res)=>res);
}

//call Apigee Implicit grant OAuth API to generate token if call to OKTA API to get session information is successfull. Otherwise return error message
export async function getOAuthToken() {
    let oktasession = await getUserOKTASession(); 
    var input = {};
    input.sessionid= oktasession.id; //session from OKTA API for logged in user
    input.jlllogin = oktasession.login; //Login name from OKTA API for logged in user    
    var data = await setApigeeToken(queryString.stringify(input));
    sessionStorage.setItem("VAS.apigee-token", data.data.access_token);
    return data.data.access_token;
}