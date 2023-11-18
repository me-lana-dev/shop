import React, { useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {
  Button,
  Col,
  Empty,
  Row,
  Space,
  Table,
  Tooltip,
  Image,
  Card,
} from "antd";
import Column from "antd/es/table/Column";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ProductTableAdmin: React.FC = () => {
  const { fetchProducts, removeProduct } = useActions();
  const { products } = useTypedSelector((state) => state.products);
  const [loadingDelete, setLoadingsDelete] = useState<boolean[]>([]);
  const linkProductCard = useNavigate();

  console.log(linkProductCard);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id: React.Key) => {
    const newData = products.filter((item) => item.id !== id);
    removeProduct(newData);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const enterLoading = (index: number) => {
    setLoadingsDelete((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadingsDelete((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 3000);
  };

  const deleteProduct = (id: React.Key) => {
    const index: number = Number(id);
    enterLoading(index);
    handleDelete(id);
  };

  interface DataType {
    id: React.Key;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
  }

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
              Таблица товаров
            </h2>
            {products.length === 0 && (
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
            {products.length > 0 && (
              <Table
                dataSource={products}
                rowKey={(record) => record.id}
                pagination={false}
                bordered={true}
                tableLayout={"auto"}
              >
                <Column
                  title="Фото"
                  dataIndex="imageUrl"
                  key="imageUrl"
                  render={(_: any, record: DataType) => (
                    <Space size="middle">
                      <Link
                        to={"/onlinestore/product/" + record.id}
                        state={{ defaultActiveKey: "4", path: "/admin" }}
                      >
                        <Image
                          width={50}
                          src={record.imageUrl}
                          placeholder={
                            <Image
                              preview={false}
                              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                              width={200}
                            />
                          }
                        />
                      </Link>
                    </Space>
                  )}
                />
                <Column
                  title="Наименование товара"
                  dataIndex="name"
                  key="name"
                  render={(_: any, record: DataType) => (
                    <Link
                      to={"/onlinestore/product/" + record.id}
                      state={{ defaultActiveKey: "4", path: "/admin" }}
                    >
                      {record.name}
                    </Link>
                  )}
                  width={"550px"}
                />
                <Column title="Цена" dataIndex="price" key="price" />
                <Column
                  title="Операции"
                  dataIndex="view"
                  key="view"
                  align="right"
                  render={(_: any, record: DataType) => (
                    <Space size="middle">
                      <Tooltip title="Обзор">
                        <Button
                          type="primary"
                          size="large"
                          icon={<EyeOutlined />}
                          onClick={() =>
                            linkProductCard(
                              "/onlinestore/product/" + record.id,
                              {
                                state: {
                                  defaultActiveKey: "4",
                                  path: "/admin",
                                },
                              }
                            )
                          }
                        />
                      </Tooltip>
                      <Tooltip title="Редактировать">
                        <Button
                          type="primary"
                          size="large"
                          icon={<EditOutlined />}
                          onClick={() => deleteProduct(record.id)}
                        />
                      </Tooltip>
                      <Tooltip title="Удалить">
                        <Button
                          type="primary"
                          size="large"
                          icon={<DeleteOutlined />}
                          danger
                          onClick={() => deleteProduct(record.id)}
                          loading={loadingDelete[Number(record.id)]}
                        />
                      </Tooltip>
                    </Space>
                  )}
                />
              </Table>
            )}
          </Card>
        </Row>
      </Space>
    </>
  );
};

export default ProductTableAdmin;
