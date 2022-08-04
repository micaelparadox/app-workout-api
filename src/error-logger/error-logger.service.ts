import { Inject, Injectable } from "@nestjs/common";
import { LogAdapter } from "./interfaces/log-adapter.interface";
import { LOGGER_ADAPTERS } from "./logger-adapter.token";
import { SeverityLevel } from "./severity-level.enum";


@Injectable()
export class ErrorLoggerService {
  private LogServices: LogAdapter[] = [];
  constructor(@Inject(LOGGER_ADAPTERS) loggerAdapters: LogAdapter[]) {
    this.LogServices.push(...loggerAdapters);
  }
  log(error: Error, severity?: SeverityLevel) {
    console.error(JSON.stringify(error));
    this.LogServices.forEach((LogService) => {
      LogService.log(error, severity);
    })
  }
}
