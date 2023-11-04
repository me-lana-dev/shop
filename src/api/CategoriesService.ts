import { ICategory } from "../models/category";

export default class CategoriesService {
  static async getCategories(): Promise<ICategory[]> {
    const categories = localStorage.getItem("categories") || "[]";
    return JSON.parse(categories) as ICategory[];
  }

  static addCategory(response: ICategory[]): void {
    localStorage.setItem("categories", JSON.stringify(response));
    return;
  }

  static removeCategory(response: ICategory[]): void {
    localStorage.removeItem("categories");
    localStorage.setItem("categories", JSON.stringify(response));
    return;
  }

  static editCategory(response: ICategory[]): void {
    localStorage.removeItem("categories");
    localStorage.setItem("categories", JSON.stringify(response));
    return;
  }
}
