import { SeverityLevel } from "../severity-level.enum";

export abstract class LogAdapter {
    abstract log(error: Error, severity?: SeverityLevel): Promise<void>;
}
