import { createAction, props } from "@ngrx/store";
import { ProductModel } from "src/app/models/product.model";

export const unsetProductos = createAction('[Producto] unset Productos');
export const setProductos = createAction(
    '[Producto] set Productos',
    props<{ producto: ProductModel[] }>()
);
