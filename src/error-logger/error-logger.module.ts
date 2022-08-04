import { Module } from '@nestjs/common';
import { SentryLoggerAdapter } from './adapters/sentry-logger.adapter';
import { ErrorLoggerService } from './error-logger.service';
import { LogAdapter } from './interfaces/log-adapter.interface';
import { LOGGER_ADAPTERS } from './logger-adapter.token';


@Module({
  imports: [],
  providers: [
    ErrorLoggerService, SentryLoggerAdapter,
    {
      provide: LOGGER_ADAPTERS,
      useFactory: (...adapters: LogAdapter[]) => adapters,
      inject: [SentryLoggerAdapter],
}
  ],
  exports: [
    ErrorLoggerService
  ]
})

export class ErrorLoggerModule { }
