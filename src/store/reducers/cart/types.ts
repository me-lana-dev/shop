import { ICart } from "../../../models/cart";

export interface CartState {
  cart: ICart[];
  isLoading: boolean;
  error: string;
}

export enum CartActionEnum {
  SET_CART = "SET_CART",
  SET_IS_LOADING = "SET_IS_LOADING",
  SET_ERROR = "SET_ERROR",
}

export interface SetCartAction {
  type: CartActionEnum.SET_CART;
  payload: ICart[];
}

export interface SetIsLoadingAction {
  type: CartActionEnum.SET_IS_LOADING;
  payload: boolean;
}

export interface SetErrorAction {
  type: CartActionEnum.SET_ERROR;
  payload: string;
}

export type CartAction = SetCartAction | SetIsLoadingAction | SetErrorAction;
