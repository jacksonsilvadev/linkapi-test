import {Request, Response} from "express";
import logger from '../utils/logger'
import DealService from '../services/Deal'
import BlingService from "../services/Bling";

class OrderController {
    public async post(req: Request, res: Response): Promise<Response> {
        try {
            const deals = await DealService.getUnregisteredDeals()
            const promises = deals.map((deal: any) => BlingService.createOrder((deal)))

            await Promise.all(promises)

            return res.json(true)
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