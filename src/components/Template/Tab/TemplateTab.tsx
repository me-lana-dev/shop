import React, { useState } from "react";
import { Tabs, TabsProps } from "antd";

type TabPosition = "left" | "right" | "top" | "bottom";

const TemplateTab = ({ items, defaultActiveKey = "1" }: TabsProps) => {
  const [mode] = useState<TabPosition>("left");

  // const onChange = (key: string) => {
  //   console.log("admin = ", admin);
  // };

  return (
    <Tabs
      defaultActiveKey={defaultActiveKey}
      tabPosition={mode}
      style={{ height: "100%" }}
      items={items}
      animated={true}
    />
  );
};

export default TemplateTab;
