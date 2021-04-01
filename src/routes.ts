import {Router} from 'express';
import OrderController from "./controllers/Order"

const routes = Router()


routes.post('/order/job', OrderController.post)

export default routes