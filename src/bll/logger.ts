import { createLogger, Logger, transports } from "winston";
import config from "../config";

const logger: Logger = createLogger({
    transports: [
      new transports.File({
           filename: 'error.log',
           dirname: config.log_folder
     })
    ],
  });

export default logger;