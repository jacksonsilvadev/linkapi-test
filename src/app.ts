import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes';
import logger from './utils/logger'
import config from './config/config'
import errorLogger from './logger/error-logger'

class App {
    public express: express.Application

    constructor() {
        this.express = express()
    }

    private middlewares(): void {
        logger.info('Starting Middlewares')
        this.express.use(express.json());
        this.express.use(cors())
    }

    private logger(): void {
        logger.info('Starting ErrorLogger.')
        this.express.use(errorLogger)
    }


    private static async database(): Promise<void> {
        try {
            logger.info('Starting Database.')
            await mongoose.connect(config.mongoose.url, config.mongoose.options)
            logger.info('Connected on MongoDB.')
        } catch (e) {
            logger.error('Connection not established: ')
            throw new Error(e)
        }

    }

    private routes(): void {
        logger.info('Starting Routes.')
        this.express.use(routes)
    }

    public async init(): Promise<express.Application> {
        logger.info('Starting your application...')
        this.middlewares()
        await App.database()
        this.routes()
        this.logger()

        return this.express
    }
}

export default new App()