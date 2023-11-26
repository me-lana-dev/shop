import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Space, Row, Card, Spin, Alert } from "antd";
import { IProduct } from "../../models/product";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { ICategory } from "../../models/category";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  // category: Yup.object({
  //   label: Yup.string().required("label is required"),
  //   value: Yup.string().required("value is required"),
  // }),
  price: Yup.number()
    .min(0, "Too Few!")
    .max(100000, "Too Much!")
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

interface ProductCreateProps {
  products: IProduct[];
}

const ProductCreate: React.FC<ProductCreateProps> = () => {
  const { fetchCategories } = useActions();
  const { error, isLoading, categories } = useTypedSelector(
    (state) => state.categories
  );
  const { createProduct } = useActions();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetchCategories();
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
            <h2 style={{ textAlign: "center", margin: "0 0 20px 0" }}>
              Создание товара
            </h2>
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
                message="Товар добавлен"
                type="success"
                showIcon
                closable
                style={{
                  marginBottom: "20px",
                }}
              />
            )}
            <Formik
              initialValues={{
                name: "",
                category: {} as ICategory,
                price: 0,
                imageUrl: "",
                description: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={(values, { resetForm }) => {
                const newValues = { ...values, id: Date.now() };
                createProduct(newValues);

                setShowAlert(true);

                setTimeout(() => {
                  setShowAlert(false);
                }, 6000);

                setTimeout(() => {
                  if (!isLoading && !error) resetForm();
                }, 3000);
              }}
            >
              {({ errors, touched }) => (
                <>
                  <Form className="form-grid">
                    <div
                      className={`form-group ${
                        errors.name && touched.name ? "has-error" : ""
                      }`}
                    >
                      <label htmlFor="name" className="form-label">
                        Название товара
                      </label>
                      {errors.name && touched.name ? (
                        <span className="form-error">{errors.name}</span>
                      ) : null}
                      <Field name="name" id="name" className="form-control" />
                    </div>
                    <div
                      className={`form-group ${
                        errors.category && touched.category ? "has-error" : ""
                      }`}
                    >
                      <label htmlFor="category" className="form-label">
                        Выбрать категорию
                      </label>
                      {errors.category && touched.category ? (
                        <span className="form-error">
                          {errors.category.name}
                        </span>
                      ) : null}
                      <Field
                        as="select"
                        name="category"
                        id="category"
                        className="form-control"
                      >
                        {/* <option value="car">Авто</option>
                        <option value="phone">Телефон</option> */}
                        {categories.map((category) => (
                          <option value={category.slug} key={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <div
                      className={`form-group ${
                        errors.price && touched.price ? "has-error" : ""
                      }`}
                    >
                      <label htmlFor="price" className="form-label">
                        Цена товара:
                      </label>
                      {errors.price && touched.price ? (
                        <span className="form-error">{errors.price}</span>
                      ) : null}
                      <Field name="price" id="price" className="form-control" />
                    </div>
                    <div
                      className={`form-group ${
                        errors.imageUrl && touched.imageUrl ? "has-error" : ""
                      }`}
                    >
                      <label htmlFor="imageUrl" className="form-label">
                        Сcылка на картинку товара
                      </label>
                      {errors.imageUrl && touched.imageUrl ? (
                        <span className="form-error">{errors.imageUrl}</span>
                      ) : null}
                      <Field
                        name="imageUrl"
                        id="imageUrl"
                        className="form-control"
                      />
                    </div>
                    <div
                      className={`form-group form-group-textarea ${
                        errors.imageUrl && touched.imageUrl ? "has-error" : ""
                      }`}
                    >
                      <label htmlFor="imageUrl" className="form-label">
                        Описание товара
                      </label>
                      {errors.description && touched.description ? (
                        <span className="form-error">{errors.description}</span>
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
                      disabled={isLoading}
                    >
                      Создать категорию
                    </button>
                  </Form>
                </>
              )}
            </Formik>
          </Card>
        </Row>
      </Space>
    </>
  );
};

export default ProductCreate;
