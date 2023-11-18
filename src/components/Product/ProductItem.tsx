import React, { useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Col, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { IProduct } from "../../models/product";

type ProductItemProps = {
  product: IProduct;
  remove: (id: React.Key) => void;
  buy: (id: React.Key) => void;
};

const ProductItem: React.FC<ProductItemProps> = ({ product, buy }) => {
  const [loadingBuy, setLoadingsBuy] = useState(false);

  const buyProduct = (id: number) => {
    setLoadingsBuy(true);
    setTimeout(() => {
      setLoadingsBuy(false);
    }, 3000);
    buy(id);
  };

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

        <Link
          to={"/onlinestore/product/" + product.id}
          state={{ defaultActiveKey: "2", path: "/onlinestore" }}
          className="ant-card-link"
        >
          {product.name}
        </Link>

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
