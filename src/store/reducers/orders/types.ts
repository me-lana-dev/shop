import { IOrder } from "../../../models/order";

export interface OrdersState {
  orders: IOrder[];
  isLoading: boolean;
  error: string;
}

export enum OrdersActionEnum {
  SET_ORDERS = "SET_ORDERS",
  SET_IS_LOADING = "SET_IS_LOADING",
  SET_ERROR = "SET_ERROR",
}

export interface SetOrdersAction {
  type: OrdersActionEnum.SET_ORDERS;
  payload: IOrder[];
}

export interface SetIsLoadingAction {
  type: OrdersActionEnum.SET_IS_LOADING;
  payload: boolean;
}

export interface SetErrorAction {
  type: OrdersActionEnum.SET_ERROR;
  payload: string;
}

export type OrdersAction =
  | SetOrdersAction
  | SetIsLoadingAction
  | SetErrorAction;
