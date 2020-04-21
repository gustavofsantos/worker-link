# Worker Link

Opionated library to work with threads in Node.js

### Getting Started

```
npm install worker-link
```

### Example with JavaScript

```javascript
// ./simple-worker.js
const {worker, WorkerJob} = require('worker-link');

class SimpleWorker extends WorkerJob {
  receive(data) {
    console.log('receive data:', data);

    this.reply('OK!');
  }
}

module.exports = worker({filename: __filename})(SimpleWorker);
```

Then create another file:

```javascript
// ./index.js
const {spawn} = require('worker-link');
const SimpleWorker = require('./simple-worker');

const sw = spawn(SimpleWorker);

sw.send('hello!').then((data) => console.log('received from thread:', data));
```

Then run with node:

```bash
$ node index.js
```

You should see the following message in your terminal:

```bash
$ node index.js

receive data: hello!
received from thread: OK!

```

You terminal will be stuck at here, because the thread is running and waiting for more messages. To end a process you need to call the `exit` method when the promise terminate:

```javascript
// ./index.js
const {spawn} = require('worker-link');
const SimpleWorker = require('./simple-worker');

const sw = spawn(SimpleWorker);

sw.send('hello!')
  .then((data) => console.log('received from thread:', data))
  .finally(() => sw.exit());
```

Now run the `node index.js` again and your terminal will be released after the thread reply:

```bash
$ node index.js

receive data: hello!
received from thread: OK!

$
```
