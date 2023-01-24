import * as clusterImport from 'cluster';
import * as os from 'os';
import { Injectable } from '@nestjs/common';

const numCPUs = os.cpus().length;
const cluster = clusterImport as unknown as clusterImport.Cluster;
//Very basic clusterization, so we can test concurrency as required by the code challenge.
@Injectable()
export class AppClusterService {
  static clusterize(callback: any): void {
    if (cluster.isPrimary) {
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting`);
        cluster.fork();
      });
      callback(cluster.isPrimary);
    } else {
      console.log(`Cluster server started on ${process.pid}`);
      callback(cluster.isPrimary);
    }
  }
}
