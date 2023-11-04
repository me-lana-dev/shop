import {
  CategoriesAction,
  CategoriesActionEnum,
  CategoriesState,
} from "./types";

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: "",
};

export default function CategorieReducer(
  state = initialState,
  action: CategoriesAction
): CategoriesState {
  switch (action.type) {
    case CategoriesActionEnum.SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case CategoriesActionEnum.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case CategoriesActionEnum.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}
