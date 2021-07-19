import { ProductModel } from "./product.model";
import { CategoryModel } from './category.model';

export interface QueryModel{

    site_id: string;
    query: string;
    paging: any;
    results:ProductModel[];
    available_filters: CategoryModel[];
    filters: CategoryModel[];
}
