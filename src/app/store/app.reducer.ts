import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';

export interface AppState {
    producto: reducers.ProductoState,
    bread: reducers.BreadState
}

export const appReducers: ActionReducerMap<AppState> = {
    producto: reducers.ProductoReducer,
    bread: reducers.BreadCrumbReducer
}
