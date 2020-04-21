import {Worker} from 'worker_threads';

/**
 * Spawn a decorated class and returns an object to send messages
 * to the spawned class
 *
 * @param {function} WorkerDecoratedClass
 * @return {object}
 */
export default function spawn(WorkerDecoratedClass: any) {
  const w = new Worker(WorkerDecoratedClass.prototype.filename);

  return {
    send: (data: any) => {
      w.postMessage(data);

      return new Promise((resolve, reject) => {
        w.once('message', resolve);
        w.once('error', reject);
      });
    },
  };
}
