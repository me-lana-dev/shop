import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Col, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { IProduct } from "../../models/product";

type ProductItemProps = {
  product: IProduct;
  remove: (id: React.Key) => void;
  buy: (id: React.Key) => void;
};

const ProductItem: React.FC<ProductItemProps> = ({ product, remove, buy }) => {
  const { pathname } = useLocation();
  const currentItemMenu = pathname.trim().split("/");
  const [isAuth, setIsAuth] = useState(false);
  const [loadingDelete, setLoadingsDelete] = useState(false);
  const [loadingBuy, setLoadingsBuy] = useState(false);

  const deleteProduct = (id: number) => {
    setLoadingsDelete(true);
    setTimeout(() => {
      setLoadingsDelete(false);
    }, 3000);
    remove(id);
  };

  const buyProduct = (id: number) => {
    setLoadingsBuy(true);
    setTimeout(() => {
      setLoadingsBuy(false);
    }, 3000);
    buy(id);
  };

  useEffect(() => {
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
          <img src={product.imageUrl} alt="product" width={110} />
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
                  onClick={() => deleteProduct(product.id)}
                  loading={loadingDelete}
                />
              </Tooltip>
            </div>
            <Link
              to={"/admin/editproduct/" + product.id}
              className="ant-card-link"
            >
              {product.name}
            </Link>
          </>
        )}

        {!isAuth && (
          <Link
            to={"/onlinestore/product/" + product.id}
            className="ant-card-link"
          >
            {product.name}
          </Link>
        )}

        <div className="ant-card-description">{product.description}</div>
        <div className="ant-card-btm">
          <div className="ant-card-price">{product.price} ₽</div>
          <div className="ant-card-buy">
            <Tooltip title="Купить">
              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
                onClick={() => buyProduct(product.id)}
                loading={loadingBuy}
              />
            </Tooltip>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default ProductItem;
