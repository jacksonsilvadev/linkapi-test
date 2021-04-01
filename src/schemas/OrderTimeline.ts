import {Document, Schema, Model, model} from 'mongoose'


interface OrderTimelineInterface {
    dealId: number;
}

export interface OrderTimelineModel extends OrderTimelineInterface, Document {
}

const OrderTimelineSchema = new Schema({
    dealId: {
        type: Schema.Types.Number,
        required: true,
        description: "Field to 'id' on Pipedrive Deal"
    },
    number: {
        type: Schema.Types.Number,
        required: true,
        description: "Field to 'numero' on Bling"
    },
    orderId: {
        type: Schema.Types.Number,
        required: true,
        description: "Field to 'idPedido' on Bling"
    },
    wonTime: {
        type: Schema.Types.Date,
        required: true,
        description: "Field to 'won_time' on Pipedrive Deal"
    },
    value: {
        type: Schema.Types.Number,
        required: true,
        description: "Value of the Order"
    }
}, {
    timestamps: true
})

export const OrderTimeline: Model<OrderTimelineModel> = model<OrderTimelineModel>('OrderTimeline', OrderTimelineSchema)
