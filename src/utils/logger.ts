import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  level: 'info',
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        format.colorize(),
        format.printf((info) => `${info.level}: ${info.timestamp}: ${info.message}`),
      ),
    }),
  ],
});

export default logger;

export function options(scenarioName: string) {
  return {
    transports: [
      new transports.File({
        filename: `test-results/logs/${scenarioName}/log.log`,
        level: 'info',
        format: format.combine(
          format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
          format.align(),
          format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`),
        ),
      }),
    ],
  };
}
