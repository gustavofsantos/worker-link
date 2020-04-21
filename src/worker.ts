import {parentPort} from 'worker_threads';
import {randomBytes} from 'crypto';

interface Config {
  filename: string;
  restartOnError?: boolean;
  maxRestartRetry?: number;
}

const defaultConfig = {
  restartOnError: false,
  maxRestartRetry: 5,
};

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
    const workerConfig = {...defaultConfig, ...config};

    let retryAttempts = 0;
    Target.prototype.filename = config.filename;
    Target.prototype.workerId = randomBytes(32).toString('hex');

    parentPort?.on('message', ({msgId, data}) => {
      try {
        Target.prototype.receive(data, msgId);
      } catch (err) {
        if (!workerConfig.restartOnError) throw err;
        if (retryAttempts >= workerConfig.maxRestartRetry) throw err;

        retryAttempts += 1;
        parentPort?.postMessage({replyTo: msgId, data: err});
      }
    });

    parentPort?.on('close', () => Target.prototype.exit());

    return Target;
  };
}
