const os = require('os');

import app from './app';
import config from './config/config'
import logger from './utils/logger'

const PORT = config.server.port

app.init().then((server) => {
    server.listen(PORT, () => {
        logger.info(`🚀 Application running on port: ${PORT}!`)
    })
}).catch((err) => {
    logger.error(err)
    throw new Error(err)
})
