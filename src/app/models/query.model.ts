import { AutorModel } from "./autor.model";
import { CategoryModel } from "./category.model";
import { ItemsModel } from "./items.model";

export interface QueryModel {

    autor: AutorModel;
    items: ItemsModel[];
    categories:CategoryModel[];

}
