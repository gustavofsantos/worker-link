import {Worker} from 'worker_threads';
import {randomBytes} from 'crypto';

export interface Spawn {
  send: <T, R>(data?: T) => Promise<R>;
  exit: () => Promise<number>;
  getId: () => number;
}

/**
 * Spawn a decorated class and returns an object to send messages
 * to the spawned class
 *
 * @param {function} WorkerJobClass
 * @return {object}
 */
export default function spawn(WorkerJobClass: any): Spawn {
  const w = new Worker(WorkerJobClass.prototype.filename);

  return {
    send: (data) => {
      const msgId = randomBytes(32).toString('hex');
      w.postMessage({msgId, data});

      return new Promise((resolve, reject) => {
        w.on('message', ({replyTo, data}) => {
          if (replyTo === msgId) {
            if (data instanceof Error) resolve(undefined);
            resolve(data);
          }
        });
        w.on('error', reject);
      });
    },
    exit: async () => await w.terminate(),
    getId: () => w.threadId,
  };
}
