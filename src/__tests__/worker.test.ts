import assert from 'assert';
import spawn from '../spawn';
import MathWorker, {MathCalc} from './math-worker';

async function test() {
  const mw = spawn(MathWorker);

  const res = await mw.send<MathCalc>({op: 'add', data: [1, 2, 3]});

  console.log('result:', res, 'from', mw.getId());

  await mw.exit();

  assert(res, 'ok?');
}

test();
