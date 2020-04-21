import {WorkerJob} from '../..';
import worker from '../../src/worker';

@worker({filename: __filename, restartOnError: true})
export class FailWorker extends WorkerJob {
  receive(data: string, from: string) {
    switch (data) {
      case 'hello':
        return this.reply('world', from);
      case 'bye':
        throw new Error('I can not say bye');
      default:
        throw new Error();
    }
  }
}
