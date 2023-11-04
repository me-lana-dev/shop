import React from "react";
import TemplateTab from "../components/Template/Tab/TemplateTab";
import { TabsProps } from "antd";
import CategoryCreate from "../components/Category/CategoryCreate";
import CategoryList from "../components/Category/CategoryList";
import ProductCreate from "../components/Product/ProductCreate";
import ProductList from "../components/Product/ProductList";
import { ICategory } from "../models/category";
import { useLocation } from "react-router-dom";

const AdminPage: React.FC = () => {
  const location = useLocation();
  let defaultActiveKey = location.state?.defaultActiveKey;
  //console.log(location);

  if (defaultActiveKey === undefined || defaultActiveKey.isNull) {
    defaultActiveKey = "1";
  }

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Создание категории",
      children: <CategoryCreate category={{} as ICategory} />,
    },
    {
      key: "2",
      label: "Создание товара",
      children: <ProductCreate products={[]} />,
    },
    {
      key: "3",
      label: "Список категорий",
      children: <CategoryList />,
    },
    {
      key: "4",
      label: "Список товаров",
      children: <ProductList />,
    },
  ];
  return <TemplateTab items={items} defaultActiveKey={defaultActiveKey} />;
};

export default AdminPage;
