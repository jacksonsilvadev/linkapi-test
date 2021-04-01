import {Router} from 'express';
import OrderController from "./controllers/Order"

const routes = Router()

routes.get('/order/report/total-by-day', OrderController.getTotalOrdersByDays)
routes.post('/order/job', OrderController.post)

export default routes