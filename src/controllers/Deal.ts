import {Request, Response} from "express";
import DealService from '../services/Deal'

class DealController {
    public async get(req: Request, res: Response): Promise<Response> {
        const orders = await DealService.get()

        return res.json(orders)
    }
}

export default new DealController()