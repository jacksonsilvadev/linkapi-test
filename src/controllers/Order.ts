import {Request, Response} from "express";
import logger from '../utils/logger'
import DealService from '../services/Deal'

class OrderController {
    public async post(req: Request, res: Response): Promise<Response> {
        try {
            const deals = await DealService.get()

            return res.json(deals)
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