import { Card, Col, Row, Space } from "antd";
import React from "react";
import CartTotal from "./CartTotal";

const CartCheckout: React.FC = () => {
  return (
    <>
      <Space
        direction="vertical"
        style={{ width: "100%", paddingBottom: "24px", paddingInline: "50px" }}
        size={[0, 48]}
      >
        <Row justify="start" align="stretch" gutter={[16, 24]}>
          <Card style={{ width: "100%" }}>
            <h2 style={{ textAlign: "center", margin: "0 0 20px 0" }}>
              Оформление заказа
            </h2>
            <Row
              justify="start"
              align="stretch"
              gutter={[16, 24]}
              style={{
                marginLeft: "0",
                marginRight: "0",
                width: "100%",
              }}
            >
              <Col xs={24} sm={24} md={24} lg={12} xl={16} xxl={16}>
                <p>Здесь будет форма!</p>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={8}>
                <CartTotal />
              </Col>
            </Row>
          </Card>
        </Row>
      </Space>
    </>
  );
};

export default CartCheckout;
