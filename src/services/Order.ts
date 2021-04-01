import DealService from './Deal'

import {OrderTimeline} from "../schemas/OrderTimeline";
import BlingService from "./Bling";


class OrderService {
    public async getIdOrdersWithOutSaveByDealId(ids: number[]) {
        const dealIds = (await OrderTimeline.find({
            'dealId': {
                $in: ids
            }
        })).map((o) => o.dealId)

        return ids.filter((id: number) => !dealIds.includes(id))
    }

    public async createOrder(deal: any, order: any, newValue?: number): Promise<any> {
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
        const promises = deals.map((deal: any) => BlingService.createOrder((deal)))

        return Promise.all(promises)
    }
}

export default new OrderService()