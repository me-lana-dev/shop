import { IProduct } from "../models/product";

export default class ProductsService {
  static async getProducts(): Promise<IProduct[]> {
    const products = localStorage.getItem("products") || "[]";
    return JSON.parse(products) as IProduct[];
  }

  static addProduct(response: IProduct[]): void {
    localStorage.setItem("products", JSON.stringify(response));
    return;
  }

  static removeProduct(response: IProduct[]): void {
    localStorage.removeItem("products");
    localStorage.setItem("products", JSON.stringify(response));
    return;
  }

  static editProduct(response: IProduct[]): void {
    localStorage.removeItem("products");
    localStorage.setItem("products", JSON.stringify(response));
    return;
  }
}
