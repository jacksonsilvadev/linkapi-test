import {Router, Request, Response} from 'express';
import DealController from "./controllers/Deal";

const routes = Router()

routes.get('/', DealController.get)

export default routes