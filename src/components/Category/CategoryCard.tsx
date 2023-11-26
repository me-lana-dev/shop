import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ICategory } from "../../models/category";
import CategoriesService from "../../api/CategoriesService";
import { Alert, Button, Card, Divider, Row, Space, Spin } from "antd";

const CategoryCard: React.FC = () => {
  const { slug } = useParams();

  const goBack = useNavigate();
  const { state } = useLocation();

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [category, setCategory] = useState({} as ICategory);

  const fetchCategory = (slug: string) => {
    setTimeout(async () => {
      const response = await CategoriesService.getCategories();
      const result = response.find((category) => category.slug === slug);
      setCategory({
        ...category,
        ...result,
      });
      setError(false);
      setIsLoading(false);
    }, 3000);
  };

  useEffect(() => {
    fetchCategory(String(slug));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Space
        direction="vertical"
        style={{ width: "100%", paddingBottom: "24px", paddingInline: "50px" }}
        size={[0, 48]}
      >
        <Row justify="start" align="stretch" gutter={[16, 24]}>
          <Card style={{ width: "100%" }}>
            <div className="headerPage">
              <Button
                type="primary"
                onClick={() =>
                  goBack(`${state.path}`, {
                    state: { defaultActiveKey: `${state.defaultActiveKey}` },
                  })
                }
              >
                Вернуться назад
              </Button>

              <Divider type="vertical" />
              <h2 style={{ textAlign: "left", margin: "0 0 0 20px" }}>
                Страница категории
              </h2>
            </div>
            {error && (
              <Alert
                message={error}
                type="error"
                showIcon
                closable
                style={{
                  marginBottom: "20px",
                }}
              />
            )}
            {isLoading && (
              <div className="form-spin">
                <Spin size="large" />
              </div>
            )}
            {Object.keys(category).length !== 0 && (
              <>
                <Divider plain>
                  Категория: {category.name} ID {category.id}
                </Divider>
                <Card style={{ width: "100%" }}>
                  <div className="categoryTable" key={category.id}>
                    <div className="td">
                      <img src={category.imageUrl} alt="category" />
                    </div>
                    <div className="td">
                      <div>
                        <span className="td-desc">Название категории: </span>
                        <span>{category.name}</span>
                      </div>
                      <div>
                        <span className="td-desc">Slug категории: </span>
                        <span>{category.slug}</span>
                      </div>
                      <div>
                        <span className="td-desc">Описание категории: </span>
                        <span>{category.description}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </Card>
        </Row>
      </Space>
    </>
  );
};

export default CategoryCard;
