import { CartActionCreators } from "./cart/action-creators";
import { CategoriesActionCreators } from "./categories/action-creators";
import { OrderActionCreators } from "./orders/action-creators";
import { ProductsActionCreators } from "./products/action-creators";

export const allActionCreators = {
  ...CategoriesActionCreators,
  ...ProductsActionCreators,
  ...CartActionCreators,
  ...OrderActionCreators,
};
