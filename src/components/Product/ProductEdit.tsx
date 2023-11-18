import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Card, Divider, Row, Space, Spin, Alert } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import ProductView from "./ProductView";
import { IProduct } from "../../models/product";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  // category: Yup.object({
  //   label: Yup.string().required("label is required"),
  //   value: Yup.string().required("value is required"),
  // }),
  price: Yup.string()
    .min(1, "Too Short!")
    .max(6, "Too Long!")
    .required("Required"),
  imageUrl: Yup.string()
    .min(2, "Too Short!")
    .max(1000, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(3000, "Too Long!")
    .required("Required"),
});

const ProductEdit: React.FC = () => {
  const goBack = useNavigate();
  console.log(goBack);
  const { id } = useParams();
  const { error, isLoading, products } = useTypedSelector(
    (state) => state.products
  );
  const { fetchProducts, editProduct } = useActions();
  const [showAlert, setShowAlert] = useState(false);
  const { pathname, state } = useLocation();

  const currentItemMenu = pathname.trim().split("/");
  const [isAuth, setIsAuth] = useState(false);

  console.log("state", pathname, state);
  console.log("goback", goBack);

  useEffect(() => {
    if (currentItemMenu[1] === "admin") {
      setIsAuth(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchProducts();
    // fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentProduct = products.filter(
    (product) => product.id === Number(id)
  );

  const restProducts = products.filter((product) => product.id !== Number(id));

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
                Страница товара
              </h2>
            </div>
            <Divider plain>
              Товар: {currentProduct[0].name} ID {currentProduct[0].id}
            </Divider>
            <Card style={{ width: "100%" }}>
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
                  message="Товар изменен"
                  type="success"
                  showIcon
                  closable
                  style={{
                    marginBottom: "20px",
                  }}
                />
              )}
              {currentProduct.map((product: IProduct) => (
                <ProductView key={product.id} product={product} />
              ))}
            </Card>

            {isAuth && (
              <>
                {isLoading && (
                  <div className="form-spin">
                    <Spin size="large" />
                  </div>
                )}
                <Divider plain>Редактировать</Divider>
                <Formik
                  initialValues={currentProduct[0]}
                  validationSchema={SignupSchema}
                  onSubmit={(values, actions) => {
                    const newProduct = [...restProducts, { ...values }];
                    editProduct(newProduct);
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
                          Название товара
                        </label>
                        {props.errors.name && props.touched.name ? (
                          <span className="form-error">
                            {props.errors.name}
                          </span>
                        ) : null}
                        <Field name="name" id="name" className="form-control" />
                      </div>
                      {/* <div
                        className={`form-group ${
                          props.errors.category && props.touched.category
                            ? "has-error"
                            : ""
                        }`}
                      >
                        <label htmlFor="category" className="form-label">
                          Выбрать категорию
                        </label>
                        {props.errors.category && props.touched.category ? (
                          <span className="form-error">
                            {props.errors.category.name}
                          </span>
                        ) : null}
                        <Field
                          as="select"
                          name="category"
                          id="category"
                          className="form-control"
                        >
                          <option value="car">Авто</option>
                          <option value="phone">Телефон</option>
                          {categories.map((category) => (
                            <option value={category.slug} key={category.id}>
                              {category.name}
                            </option>
                          ))} 
                        </Field>
                      </div> */}
                      <div
                        className={`form-group ${
                          props.errors.price && props.touched.price
                            ? "has-error"
                            : ""
                        }`}
                      >
                        <label htmlFor="price" className="form-label">
                          Цена товара:
                        </label>
                        {props.errors.price && props.touched.price ? (
                          <span className="form-error">
                            {props.errors.price}
                          </span>
                        ) : null}
                        <Field
                          name="price"
                          id="price"
                          className="form-control"
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
                          Сcылка на картинку товара
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
                        />
                      </div>
                      <div
                        className={`form-group form-group-textarea ${
                          props.errors.imageUrl && props.touched.imageUrl
                            ? "has-error"
                            : ""
                        }`}
                      >
                        <label htmlFor="imageUrl" className="form-label">
                          Описание товара
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
                          as="textarea"
                          rows="6"
                        />
                      </div>
                      <button
                        type="submit"
                        className="form-button"
                        // disabled={isLoading}
                      >
                        Изменить
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

export default ProductEdit;
