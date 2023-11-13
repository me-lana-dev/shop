import React from "react";
import DemoDataDownload from "../../DemoData/DemoDataDownload";
import { Col, Row } from "antd";

const TemplateDemo: React.FC = () => {
  return (
    <div className="top">
      <Row
        justify="space-between"
        align="middle"
        style={{ minHeight: "50px", paddingInline: "50px" }}
      >
        <Col span={24}>
          <DemoDataDownload />
        </Col>
      </Row>
    </div>
  );
};

export default TemplateDemo;
