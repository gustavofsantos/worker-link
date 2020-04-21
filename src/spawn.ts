import {Worker} from 'worker_threads';

interface Spawn {
  send: <T>(data: T) => void;
  exit: () => Promise<number>;
  getId: () => number;
}

/**
 * Spawn a decorated class and returns an object to send messages
 * to the spawned class
 *
 * @param {function} WorkerDecoratedClass
 * @return {object}
 */
export default function spawn(WorkerDecoratedClass: any): Spawn {
  const w = new Worker(WorkerDecoratedClass.prototype.filename);

  return {
    send: <T>(data: T) => {
      w.postMessage(data);

      return new Promise((resolve, reject) => {
        w.once('message', resolve);
        w.once('error', reject);
      });
    },
    exit: async () => await w.terminate(),
    getId: () => w.threadId,
  };
}
