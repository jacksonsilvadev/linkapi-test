import {Router, Request, Response} from 'express';
import DealController from "./controllers/Deal";

const routes = Router()

routes.get('/', DealController.get)

routes.post('/order/job', DealController.get)

export default routes