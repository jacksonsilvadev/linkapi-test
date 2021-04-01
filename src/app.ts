import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes';
import logger from './utils/logger'
import config from './config/config'
import errorLogger from './logger/error-logger'
import RouteMiddleware from './middlewares/Route'
import CreateOrderJob from './jobs/CreateOrder'

class App {
    public express: express.Application

    constructor() {
        this.express = express()
    }

    private middlewares(): void {
        logger.info('Starting Middlewares')
        this.express.use(express.json());
        this.express.use(cors())
        this.express.use(RouteMiddleware)
    }

    private logger(): void {
        logger.info('Starting ErrorLogger.')
        this.express.use(errorLogger)
    }


    private static async database(): Promise<void> {
        logger.info('Starting Database.')
        await mongoose.connect(config.mongoose.url, config.mongoose.options)
        logger.info('Connected on MongoDB.')
    }

    private routes(): void {
        logger.info('Starting Routes.')
        this.express.use(routes)
    }

    private static jobs(): void {
        logger.info("Starting jobs.")
        CreateOrderJob.init()
    }

    public async init(): Promise<express.Application> {
        logger.info('Starting your application...')
        this.middlewares()
        await App.database()
        this.routes()
        App.jobs()
        this.logger()

        return this.express
    }
}

export default new App()