import { Injectable } from '@nestjs/common';
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname',
    },
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
  level: process.env.LOG_LEVEL || 'info',
});

@Injectable()
export class LoggerService {
  
  debug(message: string, context?: string) {
    logger.debug(message, context);
  }

  info(message: string, context?: string) {
    logger.info(message, context);
  }

  warn(message: string, context?: string) {
    logger.warn(message, context);
  }

  error(message: string, context?: string) {
    logger.error(message, context);
  }
}
