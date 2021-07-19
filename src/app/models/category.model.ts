import { CategoryDetailModel } from "./category.detail.model";

export interface CategoryModel {
    id: string;
    name: string;
    type: string;
    values: CategoryDetailModel[];
}
