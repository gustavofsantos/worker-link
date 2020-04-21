import {parentPort} from 'worker_threads';

/**
 * WorkerJob class
 */
export default abstract class WorkerJob {
  abstract receive(data: any, from: string): void;

  /**
   * Reply with a given data.
   *
   * @param {*} data
   * @param {string} replyTo
   */
  reply(data: any, replyTo: string) {
    parentPort?.postMessage({replyTo, data});
  }
}
