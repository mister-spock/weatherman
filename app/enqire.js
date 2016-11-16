'use strict';

const
    http = require('http'),
    conf = require('./config/conf');

const
    HTTP_OK = 200;

const
    options = {
        hostname : conf.host,
        method   : 'GET',
        path     : conf.path,
        timeout  : 5000,
        headers  : {
            'Content-Type': 'application/json',
            'Accept-Charset': 'utf-8'
        }
    };

let request = new Promise((resolve, fail) => {

    let data = '';

    http.request(options, (response) => {
        response.setEncoding('utf-8');

        if (response.statusCode !== HTTP_OK) {
            fail('Code ' + response.statusCode + '::Non-OK status received from the weather API!');
        }

        response.on('data', (chunk) => { data += chunk; });
        response.on('end', () => { resolve(data); });
    })
    .on('error', (err) => { fail('HTTP request Error: ' + err.message); })
    .end();
});

request
    .then((data) => { console.log(JSON.parse(data)); })
    .catch((err) => { console.log('API Error:', err); });
