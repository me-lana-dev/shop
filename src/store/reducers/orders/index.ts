import { OrdersAction, OrdersActionEnum, OrdersState } from "./types";

const initialState: OrdersState = {
  orders: [],
  isLoading: false,
  error: "",
};

export default function OrdersReducer(
  state = initialState,
  action: OrdersAction
): OrdersState {
  switch (action.type) {
    case OrdersActionEnum.SET_ORDERS:
      return { ...state, orders: action.payload };
    case OrdersActionEnum.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case OrdersActionEnum.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}
