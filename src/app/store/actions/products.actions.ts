import { createAction, props } from "@ngrx/store";
import { ItemsModel } from "src/app/models/items.model";

export const unsetProductos = createAction('[Producto] unset Productos');
export const setProductos = createAction(
    '[Producto] set Productos',
    props<{ producto: ItemsModel[] }>()
);
