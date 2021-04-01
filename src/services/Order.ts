import DealService from './Deal'
import {OrderTimeline, OrderTimelineModel} from "../schemas/OrderTimeline";
import BlingService from "./Bling";
import logger from '../utils/logger'
import {Deal} from '../interfaces/Pipedrive/Deal';
import {Order} from '../interfaces/Bling/Order';

class OrderService {
    public async getIdOrdersWithOutSaveByDealId(ids: number[]) {
        const dealIds = (await OrderTimeline.find({
            'dealId': {
                $in: ids
            }
        })).map((o) => o.dealId)

        return ids.filter((id: number) => !dealIds.includes(id))
    }

    public async createOrder(deal: Deal, order: Order, newValue?: number): Promise<OrderTimelineModel> {
        return OrderTimeline.create({
            dealId: deal.id,
            number: order.numero,
            orderId: order.idPedido,
            wonTime: deal.won_time,
            value: newValue,
        })
    }

    public async startDealRegisterOperation(): Promise<OrderTimelineModel[] | void> {
        const deals = await DealService.getUnregisteredDeals()

        if (!deals.length) {
            logger.info(`No new integration available has been entered`)
            return
        }

        const promises = deals.map((deal: Deal) => {
            logger.info(`Started Integration for Deal ${deal.id}`)
            return BlingService.createOrder((deal))
        })

        return Promise.all(promises)
    }

    public async getTotalOrdersByDays(): Promise<{ _id: Date; amount: number; }[]> {
        return OrderTimeline.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: {
                            date: "$createdAt",
                            format: "%Y-%m-%d"
                        }
                    },
                    amount: {$sum: '$value'},
                }
            },
            {$sort: {count: 1}}
        ])
    }
}

export default new OrderService()