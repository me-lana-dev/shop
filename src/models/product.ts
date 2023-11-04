import { ICategory } from "./category";

export interface IProduct {
  id: number;
  name: string;
  category: ICategory;
  price: string;
  imageUrl: string;
  description: string;
}
