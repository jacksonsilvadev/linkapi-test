import PipedriveIntegration from '../integrations/Pipedrive'
import OrderService from './Order'


class DealService {
    public async getUnregisteredDeals(): Promise<any> {
        const allWonDeals = await this.getAllWonDeals()
        const allIds = allWonDeals.map((deal: any) => deal.id)

        const unregisteredIds = await OrderService.getIdOrdersWithOutSaveByDealId(allIds)

        return allWonDeals.filter((deal: any) => unregisteredIds.includes(deal.id))
    }

    public async getAllWonDeals(): Promise<any> {
        const {data} = await PipedriveIntegration.getWonDeals()
        return data
    }

    public async getByDealId(id: number): Promise<any> {
        const {data} = await PipedriveIntegration.getProductsByDealId(id)

        return data
    }
}

export default new DealService()