import { AppDispatch } from "../..";
import CategoriesService from "../../../api/CategoriesService";
import { ICategory } from "../../../models/category";
import {
  CategoriesActionEnum,
  SetCategoriesAction,
  SetErrorAction,
  SetIsLoadingAction,
} from "./types";

export const CategoriesActionCreators = {
  setCategories: (payload: ICategory[]): SetCategoriesAction => ({
    type: CategoriesActionEnum.SET_CATEGORIES,
    payload,
  }),
  fetchCategories: () => async (dispatch: AppDispatch) => {
    try {
      const response = CategoriesService.getCategories();
      dispatch(CategoriesActionCreators.setCategories(await response));
    } catch (e) {
      dispatch(
        CategoriesActionCreators.setError(
          "Произошла ошибка при загрузке данных..."
        )
      );
      dispatch(CategoriesActionCreators.setIsLoading(false));
    }
  },
  createCategory: (category: ICategory) => async (dispatch: AppDispatch) => {
    try {
      dispatch(CategoriesActionCreators.setIsLoading(true));
      setTimeout(async () => {
        const response = await CategoriesService.getCategories();
        response.push(category);
        CategoriesService.addCategory(response);
        dispatch(CategoriesActionCreators.setCategories(response));
        dispatch(CategoriesActionCreators.setIsLoading(false));
      }, 3000);
    } catch (e) {
      dispatch(
        CategoriesActionCreators.setError(
          "Произошла ошибка при загрузке данных..."
        )
      );
      dispatch(CategoriesActionCreators.setIsLoading(false));
    }
  },
  removeCategory: (category: ICategory[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(CategoriesActionCreators.setIsLoading(true));
      setTimeout(() => {
        CategoriesService.removeCategory(category);
        dispatch(CategoriesActionCreators.setCategories(category));
        dispatch(CategoriesActionCreators.setIsLoading(false));
      }, 3000);
    } catch (e) {
      dispatch(
        CategoriesActionCreators.setError(
          "Произошла ошибка при загрузке данных..."
        )
      );
      dispatch(CategoriesActionCreators.setIsLoading(false));
    }
  },
  editCategory: (category: ICategory[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(CategoriesActionCreators.setIsLoading(true));
      setTimeout(() => {
        CategoriesService.editCategory(category);
        dispatch(CategoriesActionCreators.setCategories(category));
        dispatch(CategoriesActionCreators.setIsLoading(false));
      }, 3000);
    } catch (e) {
      dispatch(
        CategoriesActionCreators.setError(
          "Произошла ошибка при загрузке данных..."
        )
      );
      dispatch(CategoriesActionCreators.setIsLoading(false));
    }
  },
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({
    type: CategoriesActionEnum.SET_IS_LOADING,
    payload: payload,
  }),
  setError: (payload: string): SetErrorAction => ({
    type: CategoriesActionEnum.SET_ERROR,
    payload: payload,
  }),
};
