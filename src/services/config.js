const environment = "#{Env}"; 

export function getEnvironment(){
   // return  process.env.REACT_APP_ENVIROMENT;
    let metaTag = document.querySelector("meta[name='x-app-env']").getAttribute('content');
    //let metaTag = document.head.querySelector("[property~=video][content]").content
    console.log(metaTag);
    if (metaTag != null && metaTag.length > 0) {
        if (metaTag.indexOf('{{') >= 0)
        {
            return "dev";
        }
        return metaTag; 
    }
    else
    {
        return "dev";
    }
}