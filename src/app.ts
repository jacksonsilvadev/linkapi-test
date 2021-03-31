import express from 'express';
import routes from './routes';
import errorLogger from './logger/error-logger'

class App {
    public express: express.Application

    constructor() {
        this.express = express()

        this.middlewares()
        this.database()
        this.routes()
        this.logger()
    }

    private middlewares(): void {
        // TODO
    }

    private logger(): void {
        this.express.use(errorLogger)
    }

    private database(): void {
        // TODO
    }

    private routes(): void {
        this.express.use(routes)
    }
}

export default new App().express