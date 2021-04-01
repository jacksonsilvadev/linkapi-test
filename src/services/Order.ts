import DealService from './Deal'
import {OrderTimeline, OrderTimelineModel} from "../schemas/OrderTimeline";
import BlingService from "./Bling";
import logger from '../utils/logger'

class OrderService {
    public async getIdOrdersWithOutSaveByDealId(ids: number[]) {
        const dealIds = (await OrderTimeline.find({
            'dealId': {
                $in: ids
            }
        })).map((o) => o.dealId)

        return ids.filter((id: number) => !dealIds.includes(id))
    }

    public async createOrder(deal: any, order: any, newValue?: number): Promise<OrderTimelineModel> {
        return OrderTimeline.create({
            dealId: deal.id,
            number: order.numero,
            orderId: order.idPedido,
            wonTime: deal.won_time,
            value: newValue,
        })
    }

    public async startDealRegisterOperation(): Promise<any> {
        const deals = await DealService.getUnregisteredDeals()

        if (!deals.length) {
            logger.info(`No new integration available has been entered`)
            return
        }
        const promises = deals.map((deal: any) => {
            logger.info(`Started Integration for Deal ${deal.id}`)
            return BlingService.createOrder((deal))
        })

        return Promise.all(promises)
    }
}

export default new OrderService()