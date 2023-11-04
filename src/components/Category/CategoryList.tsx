import React, { useEffect } from "react";
import { Space, Row, Card, Col, Empty } from "antd";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import CategoryItem from "./CategoryItem";

const CategoryList: React.FC = () => {
  const { fetchCategories, removeCategory } = useActions();
  const { categories } = useTypedSelector((state) => state.categories);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id: React.Key) => {
    const newData = categories.filter((item) => item.id !== id);
    removeCategory(newData);
  };

  return (
    <>
      <Space
        direction="vertical"
        style={{ width: "100%", paddingBottom: "24px", paddingInline: "50px" }}
        size={[0, 48]}
      >
        <Row justify="start" align="stretch" gutter={[16, 24]}>
          <Card style={{ width: "100%" }}>
            <h2 style={{ textAlign: "center", margin: "0 0 20px 0" }}>
              Список категорий
            </h2>

            {categories.length === 0 && (
              <Space
                direction="vertical"
                style={{
                  width: "100%",
                  paddingBottom: "24px",
                  paddingInline: "50px",
                }}
                size={[0, 48]}
              >
                <Row>
                  <Col span={24}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </Col>
                </Row>
              </Space>
            )}

            {categories.length > 0 && (
              <Space
                direction="horizontal"
                style={{
                  width: "100%",
                  paddingBottom: "24px",
                  paddingInline: "50px",
                }}
                size={[0, 48]}
              >
                <Row justify="start" align="stretch" gutter={[16, 24]}>
                  {categories.map((category) => (
                    <CategoryItem
                      key={category.id}
                      category={category}
                      remove={handleDelete}
                    />
                  ))}
                </Row>
              </Space>
            )}
          </Card>
        </Row>
      </Space>
    </>
  );
};

export default CategoryList;
