export interface ICart {
  id: number;
  idProduct: number;
  name: string;
  price: number;
  imageUrl: string;
  count: number;
  sum: number;
  total?: number;
}
