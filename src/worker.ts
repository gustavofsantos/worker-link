import {parentPort} from 'worker_threads';
import {randomBytes} from 'crypto';

interface Config {
  filename: string;
}

/**
 * Creates a worker object
 *
 * @param {object} config Worker configuration object
 * @return {function}
 */
export default function worker(config: Config) {
  /**
   * The worker decorated class
   *
   * @param {function} Target
   * @return {function}
   */
  return function WorkerDecoratedClass(Target: any) {
    Target.prototype.filename = config.filename;
    Target.prototype.workerId = randomBytes(32).toString('hex');

    parentPort?.on('message', ({msgId, data}) => {
      Target.prototype.receive(data, msgId);
    });

    parentPort?.on('close', () => Target.prototype.exit());

    return Target;
  };
}
