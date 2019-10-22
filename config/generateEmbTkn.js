const authentication = require("./authentication");
const utils = require('./utils');
const keys = require('./keys');

async function generateEmbedToken(){

    // get aad token to use for sending api requests
    tokenResponse = await authentication.getAuthenticationToken();
    if(('' + tokenResponse).indexOf('Error') > -1){
        console.log('' + tokenResponse);
        return;
    }
    
    var token = tokenResponse.accessToken;
    var authHeader = utils.getAuthHeader(token);
  
    // get report id to use in GenerateEmbedToken requestd
    var reportId;
    if(!keys.pib.reportId){
        console.log("Getting default report from workspace for generating embed token...")
  
        var reportParams = utils.createGetReportRequestParams(token)
        reportResp = await utils.sendGetReportRequestAsync(reportParams.url, reportParams.options);
        if(!reportResp) {
            return;
        }
        reportId = reportResp.id
    } else{
        reportId = keys.pib.reportId;
    } 
  
    var headers = {
        'Authorization': authHeader,
        'Content-Type': 'application/json',        
    };
  
    var options = {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({"accessLevel": "View"})
    };
  
    var url = keys.pib.apiUrl + 'v1.0/myorg/groups/' + keys.pib.workspaceId + '/reports/' + reportId + '/GenerateToken';
  
    // generate powerbi embed token to use for embed report.
    // the returned token will be printed to console.
    embedToken = await utils.sendGenerateEmbedTokenRequestAsync(url, options);
    return embedToken;
  }
  
  module.exports.generateEmbedToken = generateEmbedToken;