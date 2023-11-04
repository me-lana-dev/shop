import React from "react";
import { Layout } from "antd";

const TemplateFooter: React.FC = () => {
  const { Footer } = Layout;
  return (
    <Footer className="footer">
      © 2023 Online Store | Online Store Pet Project developed by
      <a
        href="https://github.com/me-lana-dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        &nbsp;Lana Kaliush
      </a>
    </Footer>
  );
};

export default TemplateFooter;
