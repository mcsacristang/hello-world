const request = require('request');
const keys = require('../config/keys');

const getAccessToken = function () {

    return new Promise(function (resolve, reject) {

        const url = 'https://login.microsoftonline.com/common/oauth2/token';

        const username = keys.pib.user; 
        const password = keys.pib.psk; 
        const clientId = keys.pib.client; 

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        const formData = {
            grant_type: 'password',
            client_id: clientId,
            resource: 'https://analysis.windows.net/powerbi/api',
            scope: 'openid',
            username: username,
            password: password
        };

        request.post({
            url: url,
            form: formData,
            headers: headers
        }, function (err, result, body) {
            if (err) return reject(err);
            const bodyObj = JSON.parse(body);
            resolve(bodyObj.access_token);
        });
    });
};

const getReportEmbedToken = function (accessToken, groupId, reportId) {

    return new Promise(function (resolve, reject) {

        const url = 'https://api.powerbi.com/v1.0/myorg/groups/' + groupId + '/reports/' + reportId + '/GenerateToken';

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + accessToken
        };

        const formData = {
            'accessLevel': 'view'
        };

        request.post({
            url: url,
            form: formData,
            headers: headers

        }, function (err, result, body) {
            if (err) return reject(err);
            const bodyObj = JSON.parse(body);
            resolve(bodyObj.token);
        });
    });
};


module.exports = {
    embedReport: function (req, res) {
        getAccessToken().then(function (accessToken) {
            getReportEmbedToken(accessToken, req.params.groupId, req.params.reportId).then(function (embedToken) {
                res.render('dashboard', {
                    reportId: req.params.reportId,
                    embedToken,
                    embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=' + req.params.reportId + '&groupId=' + req.params.groupId
                });
            }).catch(function (err) {
                res.send(500, err);
            });
        }).catch(function (err) {
            res.send(500, err);
        });
    }
};