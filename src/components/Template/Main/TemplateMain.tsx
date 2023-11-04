import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const TemplateMain: React.FC = () => {
  const { Content } = Layout;
  return (
    <Content className="main">
      <Outlet />
    </Content>
  );
};

export default TemplateMain;
