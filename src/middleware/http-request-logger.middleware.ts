import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from 'src/services/logger.service';

@Injectable()
export class HttpRequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: Function) {
    const startTimestamp = Date.now();
    res.on('finish', () => {
      const endTimestamp = Date.now();
      const duration = endTimestamp - startTimestamp;
      const { method, originalUrl } = req;
      const { statusCode, statusMessage } = res;
      this.logger.info(
        `${method} ${originalUrl} ${statusCode} ${statusMessage} completed in ${duration}ms`,
      );
    });

    next();
  }
}
