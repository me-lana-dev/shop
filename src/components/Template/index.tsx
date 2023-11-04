import React from "react";
import { Layout, Space } from "antd";
import TemplateHeader from "./Header/TemplateHeader";
import TemplateMain from "./Main/TemplateMain";
import TemplateFooter from "./Footer/TemplateFooter";

const index: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <TemplateHeader />
        <TemplateMain />
        <TemplateFooter />
      </Layout>
    </Space>
  );
};

export default index;
