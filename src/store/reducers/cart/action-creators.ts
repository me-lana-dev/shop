import { AppDispatch } from "../..";
import CartService from "../../../api/CartService";
import { ICart } from "../../../models/cart";
import {
  CartActionEnum,
  SetCartAction,
  SetErrorAction,
  SetIsLoadingAction,
} from "./types";

export const CartActionCreators = {
  setCart: (payload: ICart[]): SetCartAction => ({
    type: CartActionEnum.SET_CART,
    payload,
  }),
  fetchCart: () => async (dispatch: AppDispatch) => {
    try {
      const response = CartService.getCart();
      dispatch(CartActionCreators.setCart(await response));
    } catch (e) {
      CartActionCreators.setError("Произошла ошибка при загрузке данных...");
    }
  },
  createCart: (cart: ICart) => async (dispatch: AppDispatch) => {
    try {
      dispatch(CartActionCreators.setIsLoading(true));
      setTimeout(async () => {
        const response = await CartService.getCart();
        response.push(cart);
        CartService.addCart(response);
        dispatch(CartActionCreators.setCart(response));
        dispatch(CartActionCreators.setIsLoading(false));
      }, 3000);
    } catch (e) {
      dispatch(
        CartActionCreators.setError("Произошла ошибка при загрузке данных...")
      );
    }
  },
  removeCart: (cart: ICart[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(CartActionCreators.setIsLoading(true));
      setTimeout(() => {
        CartService.removeCart(cart);
        dispatch(CartActionCreators.setCart(cart));
        dispatch(CartActionCreators.setIsLoading(false));
      }, 3000);
    } catch (e) {
      dispatch(
        CartActionCreators.setError("Произошла ошибка при загрузке данных...")
      );
      dispatch(CartActionCreators.setIsLoading(false));
    }
  },
  editCart: (cart: ICart[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(CartActionCreators.setIsLoading(true));
      setTimeout(() => {
        CartService.editCart(cart);
        dispatch(CartActionCreators.setCart(cart));
        dispatch(CartActionCreators.setIsLoading(false));
      }, 3000);
    } catch (e) {
      dispatch(
        CartActionCreators.setError("Произошла ошибка при загрузке данных...")
      );
      dispatch(CartActionCreators.setIsLoading(false));
    }
  },
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({
    type: CartActionEnum.SET_IS_LOADING,
    payload: payload,
  }),
  setError: (payload: string): SetErrorAction => ({
    type: CartActionEnum.SET_ERROR,
    payload: payload,
  }),
};
