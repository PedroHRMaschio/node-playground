const express = require('express');
const crypto = require('crypto');
const app = express();

const port = 3030;

app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        res.send('Hello World!');
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

/*
 * What is PM2?
 * PM2 (Process Manager 2) is a production-grade process manager for Node.js applications.
 * It allows you to keep your applications running continuously, reload them without downtime,
 * and manage multiple instances efficiently.
 * 
 * Benefits of PM2:
 * - Keeps applications running even after crashes or server reboots.
 * - Supports running applications in cluster mode to utilize multiple CPU cores.
 * - Provides log management and monitoring tools.
 * - Can be set up as a daemon to run applications in the background.
 *
 * How to Use PM2:
 *
 * 1. Install PM2 globally on your system:
 *    $ npm install -g pm2
 *
 * 2. Start the server using PM2:
 *    $ pm2 start index-example-3.js
 *
 * 3. Start the server using multiple CPU cores for better performance:
 *    $ pm2 start index-example-3.js -i 0
 *    The "-i 0" option tells PM2 to use all available CPU cores in cluster mode,
 *    which improves performance by distributing requests across multiple processes.
 *
 * 4. List all running processes managed by PM2:
 *    $ pm2 list
 *
 * 5. View real-time logs of the application:
 *    $ pm2 logs index-example-3
 *
 * 6. Restart the application (useful after code changes):
 *    $ pm2 restart index-example-3
 *
 * 7. Stop and remove the application from PM2 process management:
 *    $ pm2 delete index-example-3
 *
 * 8. Keep the application running after closing the terminal:
 *    $ pm2 start index-example-3.js --name my-app -i 2
 *    The "--name my-app" flag assigns a custom name, and "-i 2" runs it with 2 instances.
 *
 * 9. Set up PM2 to restart your app automatically after a system reboot:
 *    $ pm2 startup
 *    Follow the instructions provided by the command to configure auto-start.
 *
 * 10. Save the current PM2 process list (so they restart automatically after reboot):
 *    $ pm2 save
 *
 */