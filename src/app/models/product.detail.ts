import { AttributesModel } from "./attributes.model";
import { PicturesModel } from "./pictures.model";

export interface ProductDetailModel {
    id: string;
    title: string;
    price: string;
    sold_quantity: number;
    pictures: PicturesModel[];
    attributes: AttributesModel[];
}
