import { PriceModel } from "./price.model";

export interface ItemsModel {
    id: string;
    title: string;
    price: PriceModel;
    condition: string;
    picture: string;
    free_shipping: boolean;
    categories: string;
    state: string;
    sold_quantity?: number;
    description?: string;
}
