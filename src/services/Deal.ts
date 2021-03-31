import PipedriveIntegration from '../integrations/Pipedrive'


class DealService {
    public async get(): Promise<any> {
        const {data} = await PipedriveIntegration.getWonDeals()

        return data
    }

    public async getByDealId(id: number): Promise<any> {
        const {data} = await PipedriveIntegration.getProductsByDealId(id)

        return data
    }
}

export default new DealService()