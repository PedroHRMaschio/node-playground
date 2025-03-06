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

// - The `doWork` function simulates a CPU-intensive task by running a loop for a specified duration.
// - In this example, the function runs for 5 seconds.
// - When a request is made to the root URL (`/`), the server will perform this task before sending a response.
// - This will block the event loop and prevent the server from handling other requests during this time.
// - To test this behavior, you can make multiple requests to the server while the first request is processing.
// - You will notice that subsequent requests are not handled until the first one completes.
// - This is because the event loop is blocked by the CPU-intensive task, preventing it from processing other events.
// - This behavior is not ideal for a server handling multiple requests concurrently.
// - In a production environment, you should avoid blocking the event loop with long-running synchronous tasks.
// - Instead, consider using asynchronous operations or delegating CPU-intensive tasks to worker threads or child processes.
// - This will allow the server to handle multiple requests concurrently without blocking the event loop.

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});