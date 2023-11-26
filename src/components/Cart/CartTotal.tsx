import { Button, Card } from "antd";
import React, { useEffect, useState } from "react";
import { ICart } from "../../models/cart";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useLocation, useNavigate } from "react-router-dom";

const CartTotal: React.FC = () => {
  const checkoutLink = useNavigate();
  const { pathname } = useLocation();
  const currentItemMenu = pathname.trim().split("/");
  const [isCart, setIsCart] = useState(false);

  const { fetchCart } = useActions();
  const { cart } = useTypedSelector((state) => state.cart);
  const countProducts = (cart: ICart[]) => {
    return cart.reduce((count: number, cartItemCurrent: ICart) => {
      return count + cartItemCurrent.count;
    }, 0);
  };

  const countProductsSum = (cart: ICart[]) => {
    return cart.reduce((sum: number, cartItemCurrent: ICart) => {
      return sum + cartItemCurrent.sum;
    }, 0);
  };

  useEffect(() => {
    fetchCart();
    // console.log(countProducts(cart));
    // console.log(countProductsSum(cart));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentItemMenu[1] === "cart") {
      setIsCart(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card
      style={{
        width: "100%",
        height: "100%",
        background: "#f0f0f0",
        border: "none",
      }}
    >
      <h3 style={{ textAlign: "center", margin: "0 0 20px 0" }}>Ваш заказ:</h3>
      <div className="card-total-td">
        <div>Товаров в корзине:</div>
        <div>{countProducts(cart)}</div>
      </div>
      <div className="card-total-td">
        <div>Итого:</div>
        <div>{countProductsSum(cart)}</div>
      </div>
      {isCart && (
        <div className="card-total-btn">
          <Button
            type="primary"
            size="large"
            onClick={() => checkoutLink("/checkout")}
          >
            Оформить заказ
          </Button>
        </div>
      )}
    </Card>
  );
};

export default CartTotal;
