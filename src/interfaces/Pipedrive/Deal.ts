export interface Deal {
    id: number;
    person_id: {
        name: string;
        email: {
            value: string;
        }[];
        phone: {
            label: string;
            value: string;
            primary: boolean
        }[];
    };
    org_id: {
        address: string;
    };
    won_time: Date;
    weighted_value: number;
    weighted_value_currency: string;
    products_count: number;
}

export interface Product {
    id: number;
    name: string;
    quantity: number;
    item_price: number;
}