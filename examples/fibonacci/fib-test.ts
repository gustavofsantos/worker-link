import spawn from '../../src/spawn';
import {FibWorker} from './fib-worker';

for (let i = 0; i < 8; i++) {
  const fw = spawn(FibWorker);
  fw.send(43)
    .then((res) => console.log(`[${i}] fib(43) = ${res}`))
    .finally(() => fw.exit());
}
