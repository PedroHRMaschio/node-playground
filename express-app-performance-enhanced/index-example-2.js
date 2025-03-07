const cluster = require('cluster');

// Is the file being executed in master mode?
if (cluster.isMaster) {
    // Cause index.js to be executed *again* but in child mode
    cluster.fork();
    cluster.fork();
} else {
    // Im a child, Im going to act like a server and do nothing else
    const express = require('express');
    const app = express();
    
    const port = 3030;
    
    function doWork(duration) {
        const start = Date.now();
        while (Date.now() - start < duration) {
            // Do nothing
        }
    }
    
    app.get('/', (req, res) => {
        doWork(5000);
        res.send('Hello World!');
    });

    app.get('/fast', (req, res) => {
        res.send('This was fast!');
    });
    
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
}
