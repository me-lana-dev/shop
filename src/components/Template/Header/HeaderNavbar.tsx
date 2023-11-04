import React, { useState } from "react";
import { MenuProps, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import CartTotalIcon from "../../Cart/CartTotalIcon";

const HeaderNavbar: React.FC = () => {
  const router = useNavigate();

  const [current, setCurrent] = useState("onlinestore");

  const items: MenuProps["items"] = [
    {
      label: "ONLINESTORE",
      key: "onlinestore",
    },
    {
      label: "ADMIN",
      key: "admin",
    },
    {
      label: <CartTotalIcon />,
      key: "cart",
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    router(e.key);
    setCurrent(e.key);
  };

  return (
    <div className="menu__wrap">
      <Menu
        mode="horizontal"
        className="menu"
        items={items}
        onClick={onClick}
        defaultSelectedKeys={["onlinestore"]}
        selectedKeys={[current]}
        style={{
          minWidth: 0,
          flex: "auto",
          textAlign: "right",
          fontSize: "14px",
          textTransform: "uppercase",
        }}
      ></Menu>
    </div>
  );
};

export default HeaderNavbar;
