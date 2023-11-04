import { ICart } from "./cart";

export interface IOrder {
  id: number;
  number: number;
  products: ICart[];
  total: number;
}
