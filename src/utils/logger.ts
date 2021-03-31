import {createLogger, transports, format} from "winston"

const transport = {
    console: new transports.Console(),
    file: new transports.File({filename: 'error.log', level: 'error'})
};

const {combine, colorize, timestamp, prettyPrint, errors, json} = format;

const logger = createLogger({
    format: combine(
        errors({stack: true}),
        timestamp(),
        prettyPrint(),
        json()
    ),
    transports: [
        transport.console,
        transport.file
    ]
})

export default logger