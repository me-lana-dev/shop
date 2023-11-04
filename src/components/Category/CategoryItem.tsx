import React, { useEffect, useState } from "react";
import { ICategory } from "../../models/category";
import { Button, Card, Col, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import Meta from "antd/es/card/Meta";

type CategoryItemProps = {
  category: ICategory;
  remove: (id: React.Key) => void;
};

const CategoryItem: React.FC<CategoryItemProps> = ({ category, remove }) => {
  const { pathname } = useLocation();
  const currentItemMenu = pathname.trim().split("/");
  const [isAuth, setIsAuth] = useState(false);
  const [loadingDelete, setLoadingsDelete] = useState(false);

  const deleteCategory = (id: number) => {
    setLoadingsDelete(true);
    setTimeout(() => {
      setLoadingsDelete(false);
    }, 3000);
    remove(id);
  };

  useEffect(() => {
    //console.log(pathname);
    if (currentItemMenu[1] === "admin") {
      setIsAuth(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {isAuth && (
          <>
            <div className="ant-card-btn">
              <Tooltip title="Удалить">
                <Button
                  type="primary"
                  size="large"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => deleteCategory(category.id)}
                  loading={loadingDelete}
                />
              </Tooltip>
            </div>
            <Link
              to={"/admin/editcategory/" + category.id}
              className="ant-card-link"
            >
              {category.name}
            </Link>
          </>
        )}
        {!isAuth && (
          <Link
            to={"/onlinestore/category/" + category.id}
            className="ant-card-link"
          >
            {category.name}
          </Link>
        )}

        <Meta description={category.description} />
      </Card>
    </Col>
  );
};

export default CategoryItem;
