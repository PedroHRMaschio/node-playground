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