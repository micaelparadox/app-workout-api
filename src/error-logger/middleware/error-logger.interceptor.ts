import { Request } from 'express';
import * as Sentry from '@sentry/node';
import { CallHandler, Catch, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, throwError, catchError } from "rxjs";
import { ErrorLoggerService } from "../error-logger.service";
import { SeverityLevel } from "../severity-level.enum";


@Catch()
export class ErrorLoggerInterceptor implements NestInterceptor {
  constructor(private readonly errorLogger: ErrorLoggerService) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((error) => {
        this.errorLogger.log(error, SeverityLevel.ERROR);
        const { path, body, params }: Request = context
          .switchToHttp()
          .getRequest();
        Sentry.captureMessage(JSON.stringify(error), {
          level: SeverityLevel.ERROR,
          tags: {
            path,
          },
          extra: {
            error: JSON.stringify(error),
            body,
            params,
          },
        });

        return throwError(() => error);
      }),
    );
  }
}
