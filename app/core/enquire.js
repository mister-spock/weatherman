/**
 * Module that abstracts all the communication with Openweathermap API
 */
'use strict';

const
    http = require('http'),
    conf = require('../config/conf'),

    HTTP_OK = 200,

    apiOptions = {
        hostname : conf.apiHost,
        path     : conf.apiPath,
        timeout  : 5000,
        headers  : {
            'Content-Type': 'application/json',
            'Accept-Charset': 'utf-8'
        }
    },

    iconOptions = {
        hostname : conf.iconHost,
        timeout  : 5000,
        headers  : {
            'Content-Type': 'image/png'
        }
    };

function enquireApi() {
    return new Promise((resolve, fail) => {
        let data = '';

        http.get(apiOptions, (response) => {
            response.setEncoding('utf-8');

            if (response.statusCode !== HTTP_OK) {
                fail('Code ' + response.statusCode + '::Non-OK status received from the weather API!');
            }

            response.on('data', (chunk) => { data += chunk; });
            response.on('end', () => { resolve(data); });
        })
        .on('error', (err) => { fail('API request Error: ' + err.message); });
    });
}

function getIconBase64(code) {
    return new Promise((resolve, fail) => {
        let data = [];

        iconOptions.path = `${conf.iconPath}${code}.png`;

        http.get(iconOptions, (response) => {
            if (response.statusCode !== HTTP_OK) {
                fail('Code ' + response.statusCode + '::Non-OK status received while getting Icon!');
            }

            response.on('data', (chunk) => { console.log(typeof chunk); data.push(chunk); });
            response.on('end', () => {
                let binary = Buffer.concat(data);
                resolve(binary.toString('base64'));
            });
        })
        .on('error', (err) => { fail('Icon request Error: ' + err.message); });
    });
}

module.exports = {
    enquireApi : enquireApi,
    getIcon    : getIconBase64
};
