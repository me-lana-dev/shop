import { TabsProps } from "antd";
import React from "react";
import TemplateTab from "../components/Template/Tab/TemplateTab";
import CategoryList from "../components/Category/CategoryList";
import ProductList from "../components/Product/ProductList";
import { useLocation } from "react-router-dom";

const OnlineStorePage: React.FC = () => {
  const location = useLocation();
  let defaultActiveKey = location.state?.defaultActiveKey;
  //console.log(location);

  if (defaultActiveKey === undefined || defaultActiveKey.isNull) {
    defaultActiveKey = "1";
  }

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Список категорий",
      children: <CategoryList />,
    },
    {
      key: "2",
      label: "Список товаров",
      children: <ProductList />,
    },
  ];
  return <TemplateTab items={items} defaultActiveKey={defaultActiveKey} />;
};

export default OnlineStorePage;
