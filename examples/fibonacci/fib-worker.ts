import WorkerJob from '../../src/worker-job';
import worker from '../../src/worker';

@worker({filename: __filename})
export class FibWorker extends WorkerJob {
  fib(num: number): number {
    if (num === 0 || num === 1) {
      return num;
    }
    return this.fib(num - 1) + this.fib(num - 2);
  }

  receive(data: number, from: string) {
    const result = this.fib(data);
    this.reply(result, from);
  }
}
