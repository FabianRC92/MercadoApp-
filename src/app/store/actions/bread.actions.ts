import { createAction, props } from "@ngrx/store";
import { CategoryModel } from "src/app/models/category.model";

export const unsetCategory = createAction('[Category] unset Category');
export const setCategory = createAction(
    '[Category] set Category',
    props<{ producto: CategoryModel[] }>()
);

export const unsetBread = createAction('[Category] unset Bread Crumb');
export const setBread = createAction(
    '[Category] set Bread Crumb',
    props<{ bread: string }>()
);
