import React from "react";
import { Layout, Space } from "antd";
import TemplateHeader from "./Header/TemplateHeader";
import TemplateMain from "./Main/TemplateMain";
import TemplateFooter from "./Footer/TemplateFooter";
import TemplateDemo from "./Demo/TemplateDemo";

const index: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <TemplateDemo />
        <TemplateHeader />
        <TemplateMain />
        <TemplateFooter />
      </Layout>
    </Space>
  );
};

export default index;
