import { ShoppingCartOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

const CartTotal: React.FC = () => {
  const { cart } = useTypedSelector((state) => state.cart);
  const { fetchCart } = useActions();
  const [total, setTotal] = useState(0);
  //console.log(setTotal);

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const countTotal = () => {
    return cart.reduce((acc, current) => {
      return current.count + acc;
    }, 0);
  };

  useEffect(() => {
    const countCart = countTotal();
    setTotal(countCart);
  }, [cart, countTotal]);

  // useTotal(countCart);

  return (
    <div className="cartIcon">
      <ShoppingCartOutlined style={{ fontSize: "28px" }} />
      <div className="cartIcon-count">{total}</div>
    </div>
  );
};

export default CartTotal;
