import {parentPort} from 'worker_threads';

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
    parentPort?.on('message', (data) => Target.prototype.receive(data));

    return Target;
  };
}
