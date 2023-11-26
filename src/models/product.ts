import { ICategory } from "./category";

export interface IProduct {
  id: number;
  name: string;
  category: ICategory;
  price: number;
  imageUrl: string;
  description: string;
}
