import {parentPort} from 'worker_threads';

/**
 * WorkerJob class
 */
export default abstract class WorkerJob {
  abstract receive(data: any): void;

  /**
   * Reply with a given data.
   *
   * @param {*} data
   */
  reply(data: any) {
    parentPort?.postMessage(data);
  }
}
