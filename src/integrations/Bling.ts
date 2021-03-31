import axios from 'axios'

class PipedriveIntegration {
    API_TOKEN: string

    constructor() {
        this.API_TOKEN = '4253815718dce9df1b8eca1057b4205b362b12c4'
    }

    public async getWonDeals() {
        const {data} = await axios.get(`https://api.pipedrive.com/v1/deals?status=won&start=0&api_token=${this.API_TOKEN}`)

        return data
    }
}

export default new PipedriveIntegration()