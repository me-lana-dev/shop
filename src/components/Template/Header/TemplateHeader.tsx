import React from "react";
import { Col, Layout, Row } from "antd";
import Logo from "./Logo";
import HeaderNavbar from "./HeaderNavbar";

const TemplateHeader: React.FC = () => {
  const { Header } = Layout;
  return (
    <Header className="header">
      <Row justify="space-between" align="middle" style={{ minHeight: "100%" }}>
        <Col span={4}>
          <Logo />
        </Col>
        <Col span={20}>
          <HeaderNavbar />
        </Col>
      </Row>
    </Header>
  );
};

export default TemplateHeader;
