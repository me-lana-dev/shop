import React, { useEffect, useState } from "react";
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
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import Column from "antd/es/table/Column";
import { Link, useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

const CategoryTableAdmin: React.FC = () => {
  const { fetchCategories, removeCategory } = useActions();
  const { categories } = useTypedSelector((state) => state.categories);
  const [loadingDelete, setLoadingsDelete] = useState<boolean[]>([]);
  const linkProductCard = useNavigate();

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id: React.Key) => {
    const newData = categories.filter((item) => item.id !== id);
    removeCategory(newData);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const enterLoading = (index: number) => {
    setLoadingsDelete((prevLoadings: any) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadingsDelete((prevLoadings: any) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 3000);
  };

  const deleteCategory = (id: React.Key) => {
    const index: number = Number(id);
    enterLoading(index);
    handleDelete(id);
  };

  interface DataType {
    id: React.Key;
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
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
              Таблица категорий
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
              <Table
                dataSource={categories}
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
                        to={"/onlinestore/category/" + record.id}
                        state={{ defaultActiveKey: "3", path: "/admin" }}
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
                  title="Категория"
                  dataIndex="name"
                  key="name"
                  width={"200px"}
                  render={(_: any, record: DataType) => (
                    <Link
                      to={"/onlinestore/category/" + record.id}
                      state={{ defaultActiveKey: "3", path: "/admin" }}
                    >
                      {record.name}
                    </Link>
                  )}
                />
                <Column
                  title="Описание категории"
                  dataIndex="description"
                  key="description"
                  width={"350px"}
                />
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
                              "/onlinestore/category/" + record.id,
                              {
                                state: {
                                  defaultActiveKey: "3",
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
                          onClick={() => deleteCategory(record.id)}
                        />
                      </Tooltip>
                      <Tooltip title="Удалить">
                        <Button
                          type="primary"
                          size="large"
                          icon={<DeleteOutlined />}
                          danger
                          onClick={() => deleteCategory(record.id)}
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

export default CategoryTableAdmin;
