import {WorkerJob} from '../worker-job';
import worker from '../worker';

export type MathCalc = {op: 'add' | 'mult'; data: number[]};

@worker({filename: __filename})
export default class MathWorker extends WorkerJob {
  add(numbers: number[]) {
    return numbers.reduce((acc, n) => acc + n, 0);
  }

  mult(numbers: number[]) {
    return numbers.reduce((acc, n) => acc * n, 1);
  }

  receive({op, data}: MathCalc) {
    switch (op) {
      case 'add':
        return this.reply(this.add(data));
      case 'mult':
        return this.reply(this.mult(data));
      default:
        return this.reply(undefined);
    }
  }
}
