const crypto = require('crypto');

const start = Date.now();
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('1:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('2:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('3:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('4:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('5:', Date.now() - start);
});

// When you run this code you will see something interesting:
// you will see 4 of them running fast, a pause and there goes
// the fith (denpends of your CPU).
// My results:
// 1: 1204
// 3: 1227
// 2: 1262
// 4: 1297
// 5: 2077
// The order is really this, the third process finished before the second one.

// This happens because Node.js uses a thread pool for asynchronous operations
// like `crypto.pbkdf2`. By default, this pool has a limit of 4 worker threads
// (set by `libuv`, the library Node.js uses for handling asynchronous I/O).

// Here’s what happens step by step:
// 1. The first four `pbkdf2` calls are executed immediately, each assigned to
// one of the four threads in the pool.
// 2. The fifth call has to wait until one of the first four threads finishes
// its work before it can start.
// 3. Once a thread becomes available, the fifth operation starts, leading to
// a noticeable delay.