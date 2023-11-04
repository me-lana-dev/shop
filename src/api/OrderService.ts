import { IOrder } from "../models/order";

export default class OrderService {
  static async getOrder(): Promise<IOrder[]> {
    const order = localStorage.getItem("order") || "[]";
    return JSON.parse(order) as IOrder[];
  }

  static addOrder(response: IOrder[]): void {
    localStorage.setItem("order", JSON.stringify(response));
    return;
  }

  static removeOrder(response: IOrder[]): void {
    localStorage.removeItem("order");
    localStorage.setItem("order", JSON.stringify(response));
    return;
  }

  static editOrder(response: IOrder[]): void {
    localStorage.removeItem("order");
    localStorage.setItem("order", JSON.stringify(response));
    return;
  }
}
