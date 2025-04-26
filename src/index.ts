import * as winston from "winston";

const logger = winston.createLogger({
    level: 'debug',
    transports: [new winston.transports.Console()],
});

logger.debug("This is a debug message")
logger.info("This is an info message")
logger.warn("This is a warning message")
logger.error("This is an error message")
