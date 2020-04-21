import spawn from '../../src/spawn';
import {FailWorker} from './fail-worker';

async function test() {
  const fw = spawn(FailWorker);

  let res = await fw.send('hello');
  console.log('>', res);

  // fail here
  res = await fw.send('bye');
  console.log('>', res);

  res = await fw.send('hello');
  console.log('>', res);
}

test();
