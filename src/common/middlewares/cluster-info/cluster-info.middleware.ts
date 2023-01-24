import { Injectable, NestMiddleware } from '@nestjs/common';
import * as clusterImport from 'cluster';
import { NextFunction } from 'express';

const cluster = clusterImport as unknown as clusterImport.Cluster;

//Reviewer:
//This is a middleware used to log the worker id that handled the request, not applicable in a real application.

@Injectable()
export class ClusterInfoMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const worker = cluster.worker;
    if (worker) {
      console.log(`Request handled by worker ${worker.id}`);
    }
    next();
  }
}
