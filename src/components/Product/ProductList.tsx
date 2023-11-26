import React, { useEffect } from "react";
import { Space, Row, Card, Col, Empty } from "antd";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import ProductItem from "./ProductItem";
import { IProduct } from "../../models/product";
// import { ICart } from "../../models/cart";

const ProductList: React.FC = () => {
  const { fetchProducts, removeProduct } = useActions();
  const { createCart, editCart } = useActions();
  const { products } = useTypedSelector((state) => state.products);
  const { cart } = useTypedSelector((state) => state.cart);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id: React.Key) => {
    const newData = products.filter((item) => item.id !== id);
    removeProduct(newData);
  };

  const handleBuy = (id: React.Key) => {
    const [newData] = products.filter((item) => item.id === id);
    console.log(newData);

    const sum = 1 * newData.price;

    const newCartItem = {
      id: Date.now(),
      idProduct: newData.id,
      name: newData.name,
      price: newData.price,
      imageUrl: newData.imageUrl,
      count: 1,
      sum: sum,
    };

    if (cart.length === 0) {
      createCart(newCartItem);
    } else {
      const productInCart = cart.filter(
        (cartItem) => cartItem.idProduct === id
      );
      console.log("productInCart", productInCart);
      if (productInCart.length === 0) {
        createCart(newCartItem);
      } else {
        const restCart = cart.filter((cartItem) => cartItem.idProduct !== id);
        const countProduct = productInCart[0].count + 1;
        const sumProduct = productInCart[0].sum * countProduct;
        newCartItem.count = countProduct;
        newCartItem.sum = sumProduct;
        console.log("restCart", restCart);
        const fullCart = [...restCart, newCartItem];
        console.log("fullCart", fullCart);
        editCart(fullCart);
      }
    }
  };

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
              Список товаров
            </h2>

            {products.length === 0 && (
              <Space
                direction="vertical"
                style={{
                  width: "100%",
                  paddingBottom: "24px",
                  paddingInline: "50px",
                }}
                size={[0, 48]}
              >
                <Row>
                  <Col span={24}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </Col>
                </Row>
              </Space>
            )}

            {products.length > 0 && (
              <Space
                direction="horizontal"
                style={{
                  width: "100%",
                  paddingBottom: "24px",
                  paddingInline: "50px",
                }}
                size={[0, 48]}
              >
                <Row justify="start" align="stretch" gutter={[16, 24]}>
                  {products.map((product: IProduct) => (
                    <ProductItem
                      key={product.id}
                      product={product}
                      remove={handleDelete}
                      buy={handleBuy}
                    />
                  ))}
                </Row>
              </Space>
            )}
          </Card>
        </Row>
      </Space>
    </>
  );
};

export default ProductList;
