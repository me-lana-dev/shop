import React, { useEffect, useState } from "react";
import { MenuProps, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
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

  const { pathname } = useLocation();
  const changeCurrentMenuItem = (pathname: string) => {
    if (pathname === "/") {
      return "onlinestore";
    }
    const last = pathname.indexOf("/", 1);

    if (last === -1) {
      return pathname.slice(1);
    } else {
      return pathname.slice(1, last);
    }
  };

  useEffect(() => {
    setCurrent(changeCurrentMenuItem(pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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
