import Config from "@common/config";
import {cache} from "@overextended/ox_lib/client";

enum LogLevel {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
    DEBUG = 'DEBUG'
}

export class Logger {
    private static formatMessage(level: LogLevel, message: string): string {
        return `[${level}] [${cache.resource}] ${message}`;
    }

    static info(message?: any, ...optionalParams: any[]): void {
        console.log(this.formatMessage(LogLevel.INFO, message), ...optionalParams);
    }

    static warn(message?: any, ...optionalParams: any[]): void {
        console.log(this.formatMessage(LogLevel.WARN, message), ...optionalParams);
    }

    static error(message?: any, ...optionalParams: any[]): void {
        console.log(this.formatMessage(LogLevel.ERROR, message), ...optionalParams);
    }

    static debug(message?: any, ...optionalParams: any[]): void {
        if (Config.Debug) {
            console.log(this.formatMessage(LogLevel.DEBUG, message), ...optionalParams);
        }
    }
}
