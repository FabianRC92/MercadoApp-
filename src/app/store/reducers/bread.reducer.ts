import { createReducer, on } from "@ngrx/store";
import * as actions from '../actions/bread.actions'

export interface BreadState {
    bread: string
}

export const BreadInitialState: BreadState = {
    bread: ''
}


const _BreadCrumbReducer = createReducer(
    BreadInitialState,
    on(
        actions.setBread,
        (state, { bread }) => ({ ...state, bread })
    ),
    on(
        actions.unsetBread,
        (state) => ({ ...state, bread: '' })
    )

);

export function BreadCrumbReducer(state: any, action: any) {
    return _BreadCrumbReducer(state, action);
}
