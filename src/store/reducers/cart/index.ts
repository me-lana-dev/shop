import { CartAction, CartActionEnum, CartState } from "./types";

const initialState: CartState = {
  cart: [],
  isLoading: false,
  error: "",
};

export default function CategorieReducer(
  state = initialState,
  action: CartAction
): CartState {
  switch (action.type) {
    case CartActionEnum.SET_CART:
      return { ...state, cart: action.payload };
    case CartActionEnum.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case CartActionEnum.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}
