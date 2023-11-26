import { AppDispatch } from "../..";
import ProductsService from "../../../api/ProductsService";
import { IProduct } from "../../../models/product";
import {
  ProductsActionEnum,
  SetProductsAction,
  SetErrorAction,
  SetIsLoadingAction,
} from "./types";

export const ProductsActionCreators = {
  setProducts: (payload: IProduct[]): SetProductsAction => ({
    type: ProductsActionEnum.SET_PRODUCTS,
    payload,
  }),
  fetchProducts: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(ProductsActionCreators.setIsLoading(true));
      const response = ProductsService.getProducts();
      dispatch(ProductsActionCreators.setProducts(await response));
      dispatch(ProductsActionCreators.setIsLoading(false));
    } catch (e) {
      dispatch(
        ProductsActionCreators.setError(
          "Произошла ошибка при загрузке данных..."
        )
      );
      dispatch(ProductsActionCreators.setIsLoading(false));
    }
  },
  createProduct: (product: IProduct) => async (dispatch: AppDispatch) => {
    try {
      dispatch(ProductsActionCreators.setIsLoading(true));
      setTimeout(async () => {
        const response = await ProductsService.getProducts();
        response.push(product);
        ProductsService.addProduct(response);
        dispatch(ProductsActionCreators.setProducts(response));
        dispatch(ProductsActionCreators.setIsLoading(false));
      }, 3000);
    } catch (e) {
      dispatch(
        ProductsActionCreators.setError(
          "Произошла ошибка при загрузке данных..."
        )
      );
      dispatch(ProductsActionCreators.setIsLoading(false));
    }
  },
  removeProduct: (product: IProduct[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(ProductsActionCreators.setIsLoading(true));
      setTimeout(() => {
        ProductsService.removeProduct(product);
        dispatch(ProductsActionCreators.setProducts(product));
        dispatch(ProductsActionCreators.setIsLoading(false));
      }, 3000);
    } catch (e) {
      dispatch(
        ProductsActionCreators.setError(
          "Произошла ошибка при загрузке данных..."
        )
      );
      dispatch(ProductsActionCreators.setIsLoading(false));
    }
  },
  editProduct: (product: IProduct[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(ProductsActionCreators.setIsLoading(true));
      setTimeout(() => {
        ProductsService.editProduct(product);
        dispatch(ProductsActionCreators.setProducts(product));
        dispatch(ProductsActionCreators.setIsLoading(false));
      }, 3000);
    } catch (e) {
      dispatch(
        ProductsActionCreators.setError(
          "Произошла ошибка при загрузке данных..."
        )
      );
      dispatch(ProductsActionCreators.setIsLoading(false));
    }
  },
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({
    type: ProductsActionEnum.SET_IS_LOADING,
    payload: payload,
  }),
  setError: (payload: string): SetErrorAction => ({
    type: ProductsActionEnum.SET_ERROR,
    payload: payload,
  }),
};
