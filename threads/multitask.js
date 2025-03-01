const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();

function doRequest() {
    https.request('https://www.google.com', res => {
        res.on('data', () => {});
        res.on('end', () => {
            console.log('Request:', Date.now() - start);
        });
    }).end();
};

function doHash() {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        console.log('Hash:', Date.now() - start);
    });
};

doRequest()

fs.readFile('multitask.js', 'utf8', () => {
    console.log('Fs:', Date.now() - start);
});

doHash()
doHash()
doHash()
doHash()

// After running this code we get this behavior:
// Request: 402
// Hash: 1169
// Fs: 1170
// Hash: 1175
// Hash: 1217
// Hash: 1226

// Explanation of the observed behavior:

// - The first log entry (`Request: 402`) appears significantly earlier than the hashing functions. 
//   This suggests that another asynchronous operation (probably an I/O operation) completed first 
//   before the CPU-intensive `pbkdf2` calls.

// - The first four `pbkdf2` calls complete in a close time range (~1169 to 1226 ms).
//   - This happens because Node.js uses a thread pool (default size: 4).
//   - The first four tasks are executed in parallel using all available threads.

// - The fifth `pbkdf2` call starts only after one of the previous ones finishes.
//   - The thread pool is full, so it must wait for an available worker.
//   - This causes a slight delay before it executes.

// ### Why does this happen?
// - Node.js delegates `pbkdf2` to the **libuv thread pool**, which has a **default size of 4 threads**.
// - The first four tasks run in parallel on the four available worker threads.
// - The fifth task has to **wait until a thread becomes free**, causing a small delay.

// ### How to modify this behavior?
// - Increase the thread pool size to handle more concurrent tasks:
// ```js
// process.env.UV_THREADPOOL_SIZE = 5;
