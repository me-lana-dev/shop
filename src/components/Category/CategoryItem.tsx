import React from "react";
import { ICategory } from "../../models/category";
import { Card, Col } from "antd";

import { Link } from "react-router-dom";
import Meta from "antd/es/card/Meta";

type CategoryItemProps = {
  category: ICategory;
  remove: (id: React.Key) => void;
};

const CategoryItem: React.FC<CategoryItemProps> = ({ category, remove }) => {
  return (
    <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={8}>
      <Card
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "100%",
        }}
      >
        <div className="ant-card-number" style={{ marginRight: "16px" }}>
          <img src={category.imageUrl} alt="category" />
        </div>

        <Link
          to={"/onlinestore/category/" + category.slug}
          state={{ defaultActiveKey: "1", path: "/onlinestore" }}
          className="ant-card-link"
        >
          {category.name}
        </Link>

        <Meta description={category.description} />
      </Card>
    </Col>
  );
};

export default CategoryItem;
