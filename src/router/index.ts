import React from "react";
import Admin from "../pages/AdminPage";
import OnlineStore from "../pages/OnlineStorePage";
import CategoryEdit from "../pages/CategoryEditPage";
import CategoryCard from "../pages/CategoryCardPage";
import ProductEdit from "../pages/ProductEditPage";
import ProductCard from "../pages/ProductCardPage";
import Cart from "../pages/CartPage";
import Checkout from "../pages/CartCheckoutPage";

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
  CATEGORYEDIT = "/admin/editcategory/:slug",
  CATEGORYCARD = "/onlinestore/category/:slug",
  PRODUCTEDIT = "/admin/editproduct/:id",
  PRODUCTCARD = "/onlinestore/product/:id",
  CART = "/cart",
  CHECKOUT = "/checkout",
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.HOME, element: OnlineStore, index: true },
  { path: RouteNames.ADMIN, element: Admin },
  { path: RouteNames.ONLINESTORE, element: OnlineStore },
  { path: RouteNames.CATEGORYEDIT, element: CategoryEdit },
  { path: RouteNames.CATEGORYCARD, element: CategoryCard },
  { path: RouteNames.PRODUCTEDIT, element: ProductEdit },
  { path: RouteNames.PRODUCTCARD, element: ProductCard },
  { path: RouteNames.CART, element: Cart },
  { path: RouteNames.CHECKOUT, element: Checkout },
];
