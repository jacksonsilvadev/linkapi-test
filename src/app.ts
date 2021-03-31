import express from 'express';
import routes from './routes';

class App {
    #express: express.Application

    constructor() {
        this.#express = express()

        this.database()
        this.routes()

    }

    private database(): void {
        // TODO
    }

    private routes(): void {
        this.#express.use(routes)
    }
}