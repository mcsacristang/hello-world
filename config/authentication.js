async function getAuthenticationToken() {
    var adal = require('adal-node');
    var fs = require('fs');
    var https = require('https');

    var AuthenticationContext = adal.AuthenticationContext;

    function turnOnLogging() {
        var log = adal.Logging;
        log.setLoggingOptions(
        {
        level : log.LOGGING_LEVEL.VERBOSE,
        log : function(level, message, error) {
            //console.log(message);
            if (error) {
            //console.log(error);
            }
        }
        });
    }

    turnOnLogging();

    var keys = require('./keys');

    var authorityUrl = keys.pib.authorityHostUrl + '/' + keys.pib.tenant;
    var authorityUrl1 = 'https://login.microsoftonline.com/common/';
    var resource = 'https://analysis.windows.net/powerbi/api';

    var context = new AuthenticationContext(authorityUrl);

    // use user credentials and appId to get an aad token
    let promise = () => { return new Promise(
        (resolve, reject) => {
            context.acquireTokenWithUsernamePassword(resource, keys.pib.user, keys.pib.psk, keys.pib.client, function(err, tokenResponse) {
                if (err) reject(err);
                console.log(err);
                resolve(tokenResponse);
                console.log(tokenResponse);
            })
        });
    };

    /*let promise = () => { return new Promise(
        (resolve, reject) => {
            context.acquireTokenWithClientCredentials(keys.pib.resourceUrl, keys.pib.client, keys.pib.secret, function(err, tokenResponse) {
                if (err) reject(err);
                resolve(tokenResponse);
            })
        });
    }*/

    var res;
    await promise().then(
        tokenResponse => res = tokenResponse
    ).catch(
        err => res = err 
    );

    return res;
}

  module.exports.getAuthenticationToken = getAuthenticationToken;