const crypto = require('crypto');

const start = Date.now();
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('1:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('2:', Date.now() - start);
});

// This shows that the node is not truly single thread.

// When you comment one crypto function and runs alone,
// you will see that the time is similar if you run them
// both together, and not the double.