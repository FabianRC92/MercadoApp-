import { createReducer, on } from "@ngrx/store";
import { ItemsModel } from "src/app/models/items.model";
import * as actions from '../actions/products.actions'

export interface ProductoState {
    producto: ItemsModel[]
}

export const ProductoInitialState: ProductoState = {
    producto: []
}

const _ProductReducer = createReducer(
    ProductoInitialState,
    on(
        actions.setProductos,
        (state, { producto }) => ({ ...state, producto: [...producto] })
    ),
    on(
        actions.unsetProductos,
        (state) => ({ ...state, producto: [] })
    )

);

export function ProductoReducer(state: any, action: any) {
    return _ProductReducer(state, action);
}
