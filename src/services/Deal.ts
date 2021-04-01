import PipedriveIntegration from '../integrations/Pipedrive'
import OrderService from './Order'
import {Deal, Product} from "../interfaces/Pipedrive/Deal";


class DealService {
    public async getUnregisteredDeals(): Promise<Deal[]> {
        const allWonDeals = await this.getAllWonDeals()
        const allIds = allWonDeals.map((deal: Deal) => deal.id)

        const unregisteredIds = await OrderService.getIdOrdersWithOutSaveByDealId(allIds)

        return allWonDeals.filter((deal: Deal) => unregisteredIds.includes(deal.id))
    }

    public async getAllWonDeals(): Promise<Deal[]> {
        const {data} = await PipedriveIntegration.getWonDeals()
        return data
    }

    public async getProductsByDealId(id: number): Promise<Product[]> {
        const {data} = await PipedriveIntegration.getProductsByDealId(id)

        return data
    }
}

export default new DealService()