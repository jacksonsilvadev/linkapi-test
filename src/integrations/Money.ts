import axios from 'axios'

class MoneyIntegration {
    API_TOKEN: string

    constructor() {
        this.API_TOKEN = 'ae21d92ce57feeb82ab9'
    }

    public async getCurrencyValue(currency: string) {
        const {data} = await axios.get(`https://free.currconv.com/api/v7/convert?apiKey=${this.API_TOKEN}&q=${currency}_BRL&compact=ultra`)

        return data[`${currency}_BRL`]
    }
}

export default new MoneyIntegration()