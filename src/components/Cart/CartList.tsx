import React, { useEffect, useState } from "react";
// import CartItem from "./CartItem";
import {
  Card,
  Col,
  Empty,
  Row,
  Space,
  Table,
  Image,
  Tooltip,
  Button,
} from "antd";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import CartTotal from "./CartTotal";
import CartCounter from "./CartCounter";

const CartList: React.FC = () => {
  const { fetchCart, removeCart, editCart } = useActions();
  const { cart } = useTypedSelector((state) => state.cart);
  const { Column } = Table;
  const [loadingDelete, setLoadingsDelete] = useState<boolean[]>([]);

  //console.log("cart", cart);

  const handleDelete = (id: React.Key) => {
    const newData = cart.filter((item) => item.id !== id);
    removeCart(newData);
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

  const changeCount2 = (value: number, id: React.Key) => {
    const restData = cart.filter((item) => item.id !== id);
    const currentData = cart.filter((item) => item.id === id);
    //console.log(value, id);
    // console.log("count", count);
    currentData[0].count = value;
    currentData[0].sum = value * currentData[0].price;
    const newCart = [...restData, ...currentData];
    const sortedNewCart = [...newCart].sort((a, b) => a.id - b.id);
    editCart(sortedNewCart);
    //console.log(restData, currentData);
    //console.log(this);
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  interface DataType {
    id: React.Key;
    idProduct: number;
    name: string;
    imageUrl: string;
    price: number;
    count: number;
    sum: number;
  }

  const data: DataType[] = cart;

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
              Корзина
            </h2>
            {cart.length === 0 && (
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
            {cart.length > 0 && (
              <Space
                direction="horizontal"
                style={{
                  width: "100%",
                  paddingBottom: "24px",
                  paddingInline: "50px",
                }}
                size={[0, 48]}
              >
                <Row
                  justify="start"
                  align="stretch"
                  gutter={[16, 24]}
                  style={{
                    marginLeft: "0",
                    marginRight: "0",
                    width: "100%",
                  }}
                >
                  <Col xs={24} sm={24} md={24} lg={12} xl={17} xxl={17}>
                    <Table
                      dataSource={data}
                      rowKey={(record) => record.id}
                      pagination={false}
                    >
                      <Column
                        title="Фото"
                        dataIndex="imageUrl"
                        key="imageUrl"
                        render={(_: any, record: DataType) => (
                          <Space size="middle">
                            <Link
                              to={"/onlinestore/product/" + record.idProduct}
                              state={{ defaultActiveKey: "2", path: "/cart" }}
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
                            to={"/onlinestore/product/" + record.idProduct}
                            state={{ defaultActiveKey: "2", path: "/cart" }}
                          >
                            {record.name}
                          </Link>
                        )}
                      />
                      <Column title="Цена" dataIndex="price" key="price" />
                      <Column
                        title="Кол-во"
                        dataIndex="action2"
                        key="action2"
                        render={(_: any, record: DataType) => (
                          <Space size="middle">
                            <CartCounter
                              minMaxCount={{
                                min: 1,
                                max: 10,
                              }}
                              value={record.count}
                              valueDefault={1}
                              changeCount={(changeCount) =>
                                changeCount2(changeCount, record.id)
                              }
                            />
                          </Space>
                        )}
                      />
                      <Column title="Сумма" dataIndex="sum" key="sum" />
                      <Column
                        title="Удалить"
                        dataIndex="action"
                        key="action"
                        render={(_: any, record: DataType) => (
                          <Space size="middle">
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
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={7} xxl={7}>
                    <CartTotal />
                  </Col>
                </Row>
              </Space>
            )}
          </Card>
        </Row>
      </Space>
    </>
  );
};

export default CartList;
