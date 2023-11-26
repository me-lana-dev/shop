import React, { useState } from "react";
import { IProduct } from "../../models/product";
import CartCounter from "../Cart/CartCounter";
import { Button, Tooltip } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

type ProductViewProps = {
  product: IProduct;
};

const ProductView: React.FC<ProductViewProps> = ({ product }) => {
  const { createCart, editCart } = useActions();
  const { cart } = useTypedSelector((state) => state.cart);
  const [loadingBuy, setLoadingsBuy] = useState(false);
  const [minMaxCount] = useState({ min: 1, max: 10 });
  const [buyCount, setBuyCount] = useState(minMaxCount.min);
  const [sumTotal, setSumTotal] = useState(product.price);

  const changeCount = (value: number) => {
    console.log("changeCount", value);
    setBuyCount(value);
    const sum = value * product.price;
    setSumTotal(sum);
  };

  const handleBuy = (product: IProduct, buyCount: number) => {
    //const [newData] = products.filter((item) => item.id === id);
    //console.log(product, buyCount);

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
      console.log("productInCart", productInCart);
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
        console.log("restCart", restCart);
        const fullCart = [...restCart, newCartItem];
        console.log("fullCart", fullCart);
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
    <div className="productTable" key={product.id}>
      <div className="td">
        <img src={product.imageUrl} alt="product" width={200} />
      </div>
      <div className="td">
        <div>
          <span className="td-desc">Название категории: </span>
          <span>{product.name}</span>
        </div>
        <div>
          <span className="td-desc">Категория: </span>
          <span>{buyCount}</span>
        </div>
        <div>
          <span className="td-desc">Цена: </span>
          <span>{product.price}</span>
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
              onClick={() => buyProduct(product)}
              loading={loadingBuy}
            >
              Купить
            </Button>
          </Tooltip>
        </div>
        <div>
          <span className="td-desc">Описание категории: </span>
          <span>{product.description}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
