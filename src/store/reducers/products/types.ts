import { IProduct } from "../../../models/product";

export interface ProductsState {
  products: IProduct[];
  isLoading: boolean;
  error: string;
}

export enum ProductsActionEnum {
  SET_PRODUCTS = "SET_PRODUCTS",
  SET_IS_LOADING = "SET_IS_LOADING",
  SET_ERROR = "SET_ERROR",
}

export interface SetProductsAction {
  type: ProductsActionEnum.SET_PRODUCTS;
  payload: IProduct[];
}

export interface SetIsLoadingAction {
  type: ProductsActionEnum.SET_IS_LOADING;
  payload: boolean;
}

export interface SetErrorAction {
  type: ProductsActionEnum.SET_ERROR;
  payload: string;
}

export type ProductsAction =
  | SetProductsAction
  | SetIsLoadingAction
  | SetErrorAction;
