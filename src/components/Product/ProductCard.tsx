import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Divider, Row, Space, Spin, Tooltip } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import CartCounter from "../Cart/CartCounter";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { IProduct } from "../../models/product";
import ProductsService from "../../api/ProductsService";

const ProductCard: React.FC = () => {
  const { id } = useParams();

  const goBack = useNavigate();
  const { state } = useLocation();

  const { cart } = useTypedSelector((state) => state.cart);
  const { createCart, editCart } = useActions();

  const [product, setProduct] = useState({
    error: false,
    isLoading: true,
    product: {} as IProduct,
  });

  const [loadingBuy, setLoadingsBuy] = useState(false);
  const [minMaxCount] = useState({ min: 1, max: 10 });
  const [buyCount, setBuyCount] = useState(minMaxCount.min);
  const [productPrice, setProductPrice] = useState(0);
  const [sumTotal, setSumTotal] = useState(0);

  const changeCount = (value: number) => {
    //console.log("changeCount", value);
    setBuyCount(value);
    const sum = value * productPrice;
    setSumTotal(sum);
  };

  const fetchProduct = (id: number) => {
    setTimeout(async () => {
      const response = await ProductsService.getProducts();
      const result = response.find((product) => product.id === id);
      setProduct({
        ...product,
        isLoading: false,
        product: result as IProduct,
      });

      setProductPrice(result ? Number(result?.price) : 0);
      setSumTotal(result ? Number(result?.price) : 0);

      //console.log(id, result);
    }, 3000);
  };

  useEffect(() => {
    fetchProduct(Number(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBuy = (product: IProduct, buyCount: number) => {
    const sum = buyCount * product.price;

    const newCartItem = {
      id: Date.now(),
      idProduct: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      count: buyCount,
      sum: sum,
    };

    if (cart.length === 0) {
      createCart(newCartItem);
    } else {
      const productInCart = cart.filter(
        (cartItem) => cartItem.idProduct === product.id
      );
      //console.log("productInCart", productInCart);
      if (productInCart.length === 0) {
        createCart(newCartItem);
      } else {
        const restCart = cart.filter(
          (cartItem) => cartItem.idProduct !== product.id
        );
        const countProduct = productInCart[0].count + buyCount;
        const sumProduct = productInCart[0].sum * countProduct;
        newCartItem.count = countProduct;
        newCartItem.sum = sumProduct;
        //console.log("restCart", restCart);
        const fullCart = [...restCart, newCartItem];
        //console.log("fullCart", fullCart);
        editCart(fullCart);
      }
    }
  };

  const buyProduct = (product: IProduct) => {
    setLoadingsBuy(true);
    setTimeout(() => {
      setLoadingsBuy(false);
    }, 3000);
    handleBuy(product, buyCount);
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
            <div className="headerPage">
              <Button
                type="primary"
                onClick={() =>
                  goBack(`${state.path}`, {
                    state: { defaultActiveKey: `${state.defaultActiveKey}` },
                  })
                }
              >
                Вернуться назад
              </Button>

              <Divider type="vertical" />
              <h2 style={{ textAlign: "left", margin: "0 0 0 20px" }}>
                Страница товара
              </h2>
            </div>
            {product.error && (
              <Alert
                message={product.error}
                type="error"
                showIcon
                closable
                style={{
                  marginBottom: "20px",
                }}
              />
            )}
            {product.isLoading && (
              <div className="form-spin">
                <Spin size="large" />
              </div>
            )}
            {Object.keys(product?.product).length !== 0 && (
              <>
                <Divider plain>
                  Товар: {product.product.name} ID {product.product.id}
                </Divider>
                <Card style={{ width: "100%" }}>
                  <div className="productTable" key={product.product.id}>
                    <div className="td">
                      <img
                        src={product.product.imageUrl}
                        alt="product"
                        width={200}
                      />
                    </div>
                    <div className="td">
                      <div>
                        <span className="td-desc">Название категории: </span>
                        <span>{product.product.name}</span>
                      </div>
                      <div>
                        <span className="td-desc">Категория: </span>
                        <span>{buyCount}</span>
                      </div>
                      <div>
                        <span className="td-desc">Цена: </span>
                        <span>{product.product.price}</span>
                      </div>
                      <div>
                        <span className="td-desc">Купить:</span>
                        <span>
                          <CartCounter
                            minMaxCount={minMaxCount}
                            valueDefault={1}
                            value={buyCount}
                            changeCount={changeCount}
                          />
                        </span>
                        <span className="td-price-total">{sumTotal}</span>
                        <Tooltip title="Купить">
                          <Button
                            type="primary"
                            size="large"
                            icon={<ShoppingCartOutlined />}
                            onClick={() => buyProduct(product.product)}
                            loading={loadingBuy}
                          >
                            Купить
                          </Button>
                        </Tooltip>
                      </div>
                      <div>
                        <span className="td-desc">Описание категории: </span>
                        <span>{product.product.description}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </Card>
        </Row>
      </Space>
    </>
  );
};

export default ProductCard;
