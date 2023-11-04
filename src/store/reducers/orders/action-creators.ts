import { AppDispatch } from "../..";
import OrderService from "../../../api/OrderService";
import { IOrder } from "../../../models/order";
import {
  OrdersActionEnum,
  SetOrdersAction,
  SetErrorAction,
  SetIsLoadingAction,
} from "./types";

export const OrderActionCreators = {
  setOrder: (payload: IOrder[]): SetOrdersAction => ({
    type: OrdersActionEnum.SET_ORDERS,
    payload,
  }),
  fetchOrder: () => async (dispatch: AppDispatch) => {
    try {
      const response = OrderService.getOrder();
      dispatch(OrderActionCreators.setOrder(await response));
    } catch (e) {
      dispatch(
        OrderActionCreators.setError("Произошла ошибка при загрузке данных...")
      );
      dispatch(OrderActionCreators.setIsLoading(false));
    }
  },
  createOrder: (order: IOrder) => async (dispatch: AppDispatch) => {
    try {
      dispatch(OrderActionCreators.setIsLoading(true));
      setTimeout(async () => {
        const response = await OrderService.getOrder();
        response.push(order);
        OrderService.addOrder(response);
        dispatch(OrderActionCreators.setOrder(response));
        dispatch(OrderActionCreators.setIsLoading(false));
      }, 3000);
    } catch (e) {
      dispatch(
        OrderActionCreators.setError("Произошла ошибка при загрузке данных...")
      );
      dispatch(OrderActionCreators.setIsLoading(false));
    }
  },
  removeOrder: (order: IOrder[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(OrderActionCreators.setIsLoading(true));
      setTimeout(() => {
        OrderService.removeOrder(order);
        dispatch(OrderActionCreators.setOrder(order));
        dispatch(OrderActionCreators.setIsLoading(false));
      }, 3000);
    } catch (e) {
      dispatch(
        OrderActionCreators.setError("Произошла ошибка при загрузке данных...")
      );
      dispatch(OrderActionCreators.setIsLoading(false));
    }
  },
  editOrder: (order: IOrder[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(OrderActionCreators.setIsLoading(true));
      setTimeout(() => {
        OrderService.editOrder(order);
        dispatch(OrderActionCreators.setOrder(order));
        dispatch(OrderActionCreators.setIsLoading(false));
      }, 3000);
    } catch (e) {
      dispatch(
        OrderActionCreators.setError("Произошла ошибка при загрузке данных...")
      );
      dispatch(OrderActionCreators.setIsLoading(false));
    }
  },
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({
    type: OrdersActionEnum.SET_IS_LOADING,
    payload: payload,
  }),
  setError: (payload: string): SetErrorAction => ({
    type: OrdersActionEnum.SET_ERROR,
    payload: payload,
  }),
};
