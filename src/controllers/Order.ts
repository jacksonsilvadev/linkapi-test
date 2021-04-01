import {Request, Response} from "express";
import logger from '../utils/logger'
import OrderService from '../services/Order'

class OrderController {
    public async post(req: Request, res: Response): Promise<Response> {
        try {
            await OrderService.startDealRegisterOperation()
            return res.json({
                status: true
            })
        } catch (err) {
            logger.error(err)

            return res.json({
                code: err.code,
                message: err.message
            })
        }
    }
}

export default new OrderController()