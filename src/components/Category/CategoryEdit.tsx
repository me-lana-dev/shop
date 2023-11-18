import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Card, Divider, Row, Space, Spin, Alert } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  slug: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  imageUrl: Yup.string()
    .min(2, "Too Short!")
    .max(1000, "Too Long!")
    .required("Required"),
});

const CategoryEdit: React.FC = () => {
  const goBack = useNavigate();
  const { id } = useParams();
  const { error, isLoading, categories } = useTypedSelector(
    (state) => state.categories
  );
  //console.log("CategoryEdit error", error, "isLoading", isLoading);
  const { fetchCategories, editCategory } = useActions();
  const [showAlert, setShowAlert] = useState(false);
  const { pathname, state } = useLocation();
  const currentItemMenu = pathname.trim().split("/");
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (currentItemMenu[1] === "admin") {
      setIsAuth(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentCategory = categories.filter(
    (category) => category.id === Number(id)
  );

  const restCategories = categories.filter(
    (category) => category.id !== Number(id)
  );

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
            <Divider plain>
              Категория: {currentCategory[0].name} ID {currentCategory[0].id}
            </Divider>
            <Card style={{ width: "100%" }}>
              {isLoading && (
                <div className="form-spin">
                  <Spin size="large" />
                </div>
              )}
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
              {showAlert && !isLoading && !error && (
                <Alert
                  message="Категория изменена"
                  type="success"
                  showIcon
                  closable
                  style={{
                    marginBottom: "20px",
                  }}
                />
              )}
              {currentCategory.map((category: any) => (
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
              ))}
            </Card>

            {isAuth && (
              <>
                <Divider plain>Редактировать</Divider>
                <Formik
                  initialValues={currentCategory[0]}
                  validationSchema={SignupSchema}
                  onSubmit={(values, actions) => {
                    const newCategory = [...restCategories, { ...values }];
                    editCategory(newCategory);
                    setShowAlert(true);
                    setTimeout(() => {
                      setShowAlert(false);
                    }, 6000);
                  }}
                >
                  {(props) => (
                    <Form className="form-grid">
                      <div
                        className={`form-group ${
                          props.errors.name && props.touched.name
                            ? "has-error"
                            : ""
                        }`}
                      >
                        <label htmlFor="name" className="form-label">
                          Название категории
                        </label>
                        {props.errors.name && props.touched.name ? (
                          <span className="form-error">
                            {props.errors.name}
                          </span>
                        ) : null}
                        <Field
                          name="name"
                          id="name"
                          className="form-control"
                          value={props.values.name}
                          onChange={props.handleChange}
                        />
                      </div>
                      <div
                        className={`form-group ${
                          props.errors.slug && props.touched.slug
                            ? "has-error"
                            : ""
                        }`}
                      >
                        <label htmlFor="slug" className="form-label">
                          Slug категории
                        </label>
                        {props.errors.slug && props.touched.slug ? (
                          <span className="form-error">
                            {props.errors.slug}
                          </span>
                        ) : null}
                        <Field
                          name="slug"
                          id="slug"
                          className="form-control"
                          value={props.values.slug}
                          onChange={props.handleChange}
                        />
                      </div>
                      <div
                        className={`form-group ${
                          props.errors.description && props.touched.description
                            ? "has-error"
                            : ""
                        }`}
                      >
                        <label htmlFor="description" className="form-label">
                          Описание категории
                        </label>
                        {props.errors.description &&
                        props.touched.description ? (
                          <span className="form-error">
                            {props.errors.description}
                          </span>
                        ) : null}
                        <Field
                          name="description"
                          id="description"
                          className="form-control"
                          value={props.values.description}
                          onChange={props.handleChange}
                        />
                      </div>
                      <div
                        className={`form-group ${
                          props.errors.imageUrl && props.touched.imageUrl
                            ? "has-error"
                            : ""
                        }`}
                      >
                        <label htmlFor="imageUrl" className="form-label">
                          Сcылка на картинку
                        </label>
                        {props.errors.imageUrl && props.touched.imageUrl ? (
                          <span className="form-error">
                            {props.errors.imageUrl}
                          </span>
                        ) : null}
                        <Field
                          name="imageUrl"
                          id="imageUrl"
                          className="form-control"
                          value={props.values.imageUrl}
                          onChange={props.handleChange}
                        />
                      </div>
                      <button
                        type="submit"
                        className="form-button"
                        // disabled={isLoading}
                      >
                        Изменить категорию
                      </button>
                    </Form>
                  )}
                </Formik>
              </>
            )}
          </Card>
        </Row>
      </Space>
    </>
  );
};

export default CategoryEdit;
