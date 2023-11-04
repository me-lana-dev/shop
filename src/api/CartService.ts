import { ICart } from "../models/cart";

export default class CartService {
  static async getCart(): Promise<ICart[]> {
    const cart = localStorage.getItem("cart") || "[]";
    return JSON.parse(cart) as ICart[];
  }

  static addCart(response: ICart[]): void {
    localStorage.setItem("cart", JSON.stringify(response));
    return;
  }

  static removeCart(response: ICart[]): void {
    localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify(response));
    return;
  }

  static editCart(response: ICart[]): void {
    localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify(response));
    return;
  }
}
