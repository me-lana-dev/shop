import React from "react";
import Admin from "../pages/AdminPage";
import OnlineStore from "../pages/OnlineStorePage";
import EditCategory from "../pages/EditCategoryPage";
import EditProduct from "../pages/EditProductPage";
import Cart from "../pages/CartPage";
import Checkout from "../pages/CheckoutPage";

export interface IRoute {
  path: string;
  index?: boolean;
  element: React.ComponentType;
}

export interface INavigate {
  to: string;
  replace: boolean;
}

export enum RouteNames {
  HOME = "/",
  ADMIN = "/admin",
  ONLINESTORE = "/onlinestore",
  EDITCATEGORY = "/admin/editcategory/:id",
  CATEGORYIEW = "/onlinestore/category/:id",
  EDITPRODUCT = "/admin/editproduct/:id",
  PRODUCTVIEW = "/onlinestore/product/:id",
  CART = "/cart",
  CHECKOUT = "/checkout",
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.HOME, element: OnlineStore, index: true },
  { path: RouteNames.ADMIN, element: Admin },
  { path: RouteNames.ONLINESTORE, element: OnlineStore },
  { path: RouteNames.EDITCATEGORY, element: EditCategory },
  { path: RouteNames.CATEGORYIEW, element: EditCategory },
  { path: RouteNames.EDITPRODUCT, element: EditProduct },
  { path: RouteNames.PRODUCTVIEW, element: EditProduct },
  { path: RouteNames.CART, element: Cart },
  { path: RouteNames.CHECKOUT, element: Checkout },
];
