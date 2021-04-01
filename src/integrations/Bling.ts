import axios from 'axios'
import config from '../config/config'

class BlingIntegration {
    API_TOKEN: string

    constructor() {
        this.API_TOKEN = config.integrations.bling.token
    }

    public async createOder(xml: string) {

        const {data} = await axios.post(`https://bling.com.br/Api/v2/pedido/json?apikey=${this.API_TOKEN}&xml=${xml}`)

        // Custom Error exception by API
        if (data.retorno.erros) {
            const error = data.retorno.erros.pop()
            throw new Error(error.erro.msg)
        } else {
            return data.retorno.pedidos.pop()
        }

    }
}

export default new BlingIntegration()