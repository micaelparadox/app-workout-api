import { Injectable } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { LogAdapter } from '../interfaces/log-adapter.interface';
import { SeverityLevel } from '../severity-level.enum';
import SentryAdapterConfig from '../config/configuration';
@Injectable()
export class SentryLoggerAdapter implements LogAdapter {
  constructor() {
    Sentry.init(SentryAdapterConfig);
  }

  async log(error: Error, severity?: SeverityLevel) {
    Sentry.captureEvent({
      message: error.message,
      tags: {
        platform: process.platform,
      },
      extra: {
        'stacktrace:': error.stack,
      },
      level: SentryLoggerAdapter.getSeverity(severity),
      release: '3.28',
    });
  }

  private static getSeverity(severity?: SeverityLevel): Sentry.SeverityLevel {
    switch (severity) {
      case SeverityLevel.WARN:
        return 'warning';
      case SeverityLevel.ERROR:
        return 'error';
      case SeverityLevel.FATAL:
        return 'fatal';
      default:
        return 'error';
    }
  }
}
