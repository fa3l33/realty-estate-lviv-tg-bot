import pino, { Logger } from "pino";
import config from "../config";

const logger: Logger = pino({
    transport: {
        target: "pino/file",
        options: {
            destination: config.log_folder,
            mkdir: true,            
        }
    }
});

export default logger;