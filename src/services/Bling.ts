import BlingIntegration from '../integrations/Bling'
import MoneyIntegration from '../integrations/Money'
import DealService from './Deal'
import OrderService from './Order'

import {parse} from 'js2xmlparser'


class BlingService {
    public async createOrder(deal: any): Promise<any> {
        try {
            // Get first mobile phone added
            const mobilePhone = deal.person_id.phone
                .find((phone: { label: string; value: string; primary: boolean }) => phone.label === 'mobile')

            // Get first home phone added
            const homePhone = deal.person_id.phone
                .find((phone: { label: string; value: string; primary: boolean }) => phone.label === 'home')

            let value = deal.weighted_value

            // If currency not is BRL get the currency value now and get the value from BRL price
            if (deal.weighted_value_currency !== "BRL" && value) {
                const currencyValue = await MoneyIntegration.getCurrencyValue(deal.weighted_value_currency)
                value = +currencyValue + +deal.weighted_value
            }

            // Default item if not have product on Deal
            let item = [{
                codigo: 1,
                descricao: `Pipedrive - Won Deal - ${deal.id}`,
                qtde: 1,
                vlr_unit: value
            }]

            // Dinamic products if user added
            if (deal.products_count > 0) {
                const products = await DealService.getByDealId(deal.id)
                item = products.map((product: any) => ({
                    codigo: product.id,
                    descricao: product.name,
                    qtde: product.quantity,
                    vlr_unit: product.item_price
                }))
            }

            const address = deal.org_id ? deal.org_id.address : ''

            const jsonToXml = {
                cliente: {
                    nome: deal.person_id.name,
                    email: deal.person_id.email ? (deal.person_id.email.pop()).value : '',
                    celular: mobilePhone ? mobilePhone.value : '',
                    fone: homePhone ? homePhone.value : '',
                    endereco: address
                },
                itens: [{
                    item: item
                }]
            }

            // Convert to XML with ISO-8859-1  because accent on words
            const xml = parse("pedido", jsonToXml, {
                declaration: {encoding: 'ISO-8859-1'}
            })

            // Send to Bling
            const data = await BlingIntegration.createOder(xml)
            const order = data.pedido

            // Create report data
            await OrderService.createOrder(deal, order, value)

            return data
        } catch (e) {
            console.log(e)
        }
    }
}

export default new BlingService()