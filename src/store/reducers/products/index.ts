import { ProductsAction, ProductsActionEnum, ProductsState } from "./types";

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: "",
};

export default function CategorieReducer(
  state = initialState,
  action: ProductsAction
): ProductsState {
  switch (action.type) {
    case ProductsActionEnum.SET_PRODUCTS:
      return { ...state, products: action.payload };
    case ProductsActionEnum.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case ProductsActionEnum.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}
