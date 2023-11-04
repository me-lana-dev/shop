import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Space, Row, Card, Spin, Alert } from "antd";
import { ICategory } from "../../models/category";
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

interface CategoryCreateProps {
  category: ICategory;
}

// const createCategory = () => {};

const CategoryCreate: React.FC<CategoryCreateProps> = (props) => {
  //console.log("props = ", props);
  const { error, isLoading } = useTypedSelector((state) => state.categories);

  const { createCategory } = useActions();

  const [showAlert, setShowAlert] = useState(false);

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
              Создание категории
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
                message="Категория добавлена"
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
                slug: "",
                description: "",
                imageUrl: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={(values, { resetForm }) => {
                const newValues = { ...values, id: Date.now() };
                createCategory(newValues);

                setShowAlert(true);

                setTimeout(() => {
                  setShowAlert(false);
                }, 6000);

                setTimeout(() => {
                  if (!isLoading && !error) resetForm();
                }, 3000);
              }}
            >
              {({ values, errors, touched, handleChange }) => (
                <>
                  <Form className="form-grid">
                    <div
                      className={`form-group ${
                        errors.name && touched.name ? "has-error" : ""
                      }`}
                    >
                      <label htmlFor="name" className="form-label">
                        Название категории
                      </label>
                      {errors.name && touched.name ? (
                        <span className="form-error">{errors.name}</span>
                      ) : null}
                      <Field
                        name="name"
                        id="name"
                        className="form-control"
                        value={values.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      className={`form-group ${
                        errors.slug && touched.slug ? "has-error" : ""
                      }`}
                    >
                      <label htmlFor="slug" className="form-label">
                        Slug категории
                      </label>
                      {errors.slug && touched.slug ? (
                        <span className="form-error">{errors.slug}</span>
                      ) : null}
                      <Field
                        name="slug"
                        id="slug"
                        className="form-control"
                        value={values.slug}
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      className={`form-group ${
                        errors.description && touched.description
                          ? "has-error"
                          : ""
                      }`}
                    >
                      <label htmlFor="description" className="form-label">
                        Описание категории
                      </label>
                      {errors.description && touched.description ? (
                        <span className="form-error">{errors.description}</span>
                      ) : null}
                      <Field
                        name="description"
                        id="description"
                        className="form-control"
                        value={values.description}
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      className={`form-group ${
                        errors.imageUrl && touched.imageUrl ? "has-error" : ""
                      }`}
                    >
                      <label htmlFor="imageUrl" className="form-label">
                        Сcылка на картинку
                      </label>
                      {errors.imageUrl && touched.imageUrl ? (
                        <span className="form-error">{errors.imageUrl}</span>
                      ) : null}
                      <Field
                        name="imageUrl"
                        id="imageUrl"
                        className="form-control"
                        value={values.imageUrl}
                        onChange={handleChange}
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

export default CategoryCreate;
