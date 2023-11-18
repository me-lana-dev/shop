import React from "react";
import TemplateTab from "../components/Template/Tab/TemplateTab";
import { TabsProps } from "antd";
import CategoryCreate from "../components/Category/CategoryCreate";
import ProductCreate from "../components/Product/ProductCreate";
import { ICategory } from "../models/category";
import { useLocation } from "react-router-dom";
import CategoryTableAdmin from "../components/Category/CategoryTableAdmin";
import ProductTableAdmin from "../components/Product/ProductTableAdmin";

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
      children: <CategoryTableAdmin />,
    },
    {
      key: "4",
      label: "Список товаров",
      children: <ProductTableAdmin />,
    },
  ];
  return <TemplateTab items={items} defaultActiveKey={defaultActiveKey} />;
};

export default AdminPage;
