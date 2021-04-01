import axios from 'axios'
import config from '../config/config'
import {Deal} from "../interfaces/Pipedrive/Deal";

class PipedriveIntegration {
    API_TOKEN: string

    constructor() {
        this.API_TOKEN = config.integrations.pipedrive.token
    }

    public async getWonDeals() {
        const {data} = await axios.get(`https://api.pipedrive.com/v1/deals?status=won&start=0&api_token=${this.API_TOKEN}`)

        return data
    }

    public async getProductsByDealId(id: number) {
        const {data} = await axios.get(`https://api.pipedrive.com/v1/deals/${id}/products?api_token=${this.API_TOKEN}`)

        return data
    }
}

export default new PipedriveIntegration()