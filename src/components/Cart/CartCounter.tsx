import React, { useEffect, useState } from "react";
import { Button, InputNumber } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

type CartCounterProps = {
  minMaxCount: { min: number; max: number };
  value: number;
  valueDefault: number;
  changeCount: (value: number, id?: number) => void;
};

const CartCounter: React.FC<CartCounterProps> = ({
  minMaxCount,
  value,
  valueDefault,
  changeCount,
}) => {
  const { min, max } = minMaxCount;
  const [count, setCount] = useState<number>(value);
  const [disableBtn, setDisableBtn] = useState({
    decrement: false,
    increment: false,
  });

  //console.log("valueDefault", valueDefault, "value", value);

  useEffect(() => {
    min === max
      ? setDisableBtn({ ...disableBtn, decrement: true, increment: true })
      : setDisableBtn({ ...disableBtn, decrement: false, increment: false });
    min === value
      ? setDisableBtn({ ...disableBtn, decrement: true })
      : setDisableBtn({ ...disableBtn, decrement: false, increment: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (value: any) => {
    setCount(value);
    changeCount(value);
    if (value > min) {
      setDisableBtn({ ...disableBtn, decrement: false, increment: false });
    }
    if (value < max) {
      setDisableBtn({ ...disableBtn, decrement: false, increment: false });
    }
    if (value === min || value < min) {
      setDisableBtn({ ...disableBtn, decrement: true, increment: false });
    }
    if (value === max || value > max) {
      setDisableBtn({ ...disableBtn, decrement: false, increment: true });
    }
  };

  const decrement = () => {
    setDisableBtn({ ...disableBtn, increment: false });
    setCount(count - 1);
    changeCount(count - 1);
    if (min === count - 1) {
      setDisableBtn({ ...disableBtn, decrement: true, increment: false });
    }
    if (min + 1 === max) {
      if (min === count || min < count) {
        setDisableBtn({ ...disableBtn, decrement: true, increment: false });
      }
    }
  };

  const increment = () => {
    setDisableBtn({ ...disableBtn, decrement: false });
    setCount(count + 1);
    console.log(changeCount);
    changeCount(count + 1);
    if (max === count + 1) {
      setDisableBtn({ ...disableBtn, increment: true, decrement: false });
    }
    if (min + 1 === max) {
      if (max === count || max > count) {
        setDisableBtn({ ...disableBtn, increment: true, decrement: false });
      }
    }
  };

  return (
    <div className="cartCounter">
      <Button
        type="primary"
        size="large"
        icon={<MinusOutlined />}
        onClick={decrement}
        disabled={disableBtn.decrement}
      />
      <InputNumber<number>
        className="inputProductCount"
        min={min}
        max={max}
        value={count}
        defaultValue={valueDefault}
        size="large"
        onChange={onChange}
      />
      <Button
        type="primary"
        size="large"
        icon={<PlusOutlined />}
        onClick={increment}
        disabled={disableBtn.increment}
      />
    </div>
  );
};

export default CartCounter;
