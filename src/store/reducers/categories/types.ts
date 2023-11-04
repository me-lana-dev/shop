import { ICategory } from "../../../models/category";

export interface CategoriesState {
  categories: ICategory[];
  isLoading: boolean;
  error: string;
}

export enum CategoriesActionEnum {
  SET_CATEGORIES = "SET_CATEGORIES",
  SET_IS_LOADING = "SET_IS_LOADING",
  SET_ERROR = "SET_ERROR",
}

export interface SetCategoriesAction {
  type: CategoriesActionEnum.SET_CATEGORIES;
  payload: ICategory[];
}

export interface SetIsLoadingAction {
  type: CategoriesActionEnum.SET_IS_LOADING;
  payload: boolean;
}

export interface SetErrorAction {
  type: CategoriesActionEnum.SET_ERROR;
  payload: string;
}

export type CategoriesAction =
  | SetCategoriesAction
  | SetIsLoadingAction
  | SetErrorAction;
