import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    //Reviewer:
    //This is a middleware used to check if the token is a valid uuid Only, not applicable in a real application.

    const token = req.headers['x-access-token'];

    const uuidRegex = new RegExp(
      '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$',
    );

    if (token && uuidRegex.test(token.toString())) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
