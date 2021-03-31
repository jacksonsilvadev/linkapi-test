import PipedriveIntegration from '../integrations/Pipedrive'


class DealService {
    public async get(): Promise<any> {
        const {data} = await PipedriveIntegration.getWonDeals()

        return data
    }
}

export default new DealService()