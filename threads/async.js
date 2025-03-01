const https = require('https');

const start = Date.now();

function doRequest() {
    https.request('https://www.google.com', res => {
        res.on('data', () => {});
        res.on('end', () => {
            console.log(Date.now() - start);
        });
    }).end();
};

doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();

// All the work is doing by the OS and the result is a very
// similar time in all requests, because it has no limitations
// on our thread poll
