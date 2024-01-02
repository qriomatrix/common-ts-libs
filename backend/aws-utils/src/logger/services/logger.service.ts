import { Logger } from '@aws-lambda-powertools/logger';
import { LogLevel } from '@aws-lambda-powertools/logger/lib/types';
import { LambdaLogFormatter } from '../formatters/lambda-log-formatter';
import { Inject } from '@nestjs/common';

export class LoggerService {
  private correlationId: string;

  constructor(
    @Inject('APP_NAME') private readonly appName: string,
    correlationId = '',
  ) {
    this.setCorrelationId(correlationId);
  }

  setCorrelationId(correlationId: string) {
    this.correlationId = correlationId;
  }

  getLogger(loggedBy: string, logLevel: LogLevel = 'INFO'): Logger {
    return new Logger({
      logLevel,
      serviceName: this.appName,
      logFormatter: new LambdaLogFormatter(),
      persistentLogAttributes: {
        correlationId: this.correlationId,
        env: process.env.ENV,
        loggedBy,
      },
    });
  }
}