import BlingIntegration from '../integrations/Bling'
import MoneyIntegration from '../integrations/Money'
import DealService from './Deal'
import OrderService from './Order'

import {parse} from 'js2xmlparser'
import {Deal, Product} from "../interfaces/Pipedrive/Deal";
import {OrderTimelineModel} from '../schemas/OrderTimeline';


class BlingService {
    public async createOrder(deal: Deal): Promise<OrderTimelineModel> {
        // Get first mobile phone added
        const mobilePhone = deal.person_id.phone
            .find((phone) => phone.label === 'mobile')

        // Get first home phone added
        const homePhone = deal.person_id.phone
            .find((phone) => phone.label === 'home')

        const email = deal.person_id.email.find((e) => !!e.value)

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
            const products = await DealService.getProductsByDealId(deal.id)
            item = products.map((product: Product): {
                codigo: number;
                descricao: string;
                qtde: number;
                vlr_unit: number;
            } => ({
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
                email: email ? email.value : '',
                celular: mobilePhone ? mobilePhone.value : '',
                fone: homePhone ? homePhone.value : '',
                endereco: address,
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
        return OrderService.createOrder(deal, order, value)
    }
}

export default new BlingService()