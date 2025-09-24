import { Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories, fetchItems } from "../../../api";

export default function Recommended() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const data = await fetchItems();
        setItems(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, []);

  return (
    <div className="pt-5 p-4">
      <Row gutter={[10, 12]} justify={"space-between"}>
        {items?.map((category, index) => (
          <Col key={index} xs={10} sm={8} md={6} lg={4}>
            <Card
              hoverable
              cover={
                <div className="w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={category?.imageUrl}
                    alt={category?.category?.title}
                    className="w-full h-auto"
                  />
                </div>
              }
              onClick={() => navigate(`/category/${category?.category?.title}`)}
              bodyStyle={{
                textAlign: "center",
                padding: "12px 16px",
                minHeight: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="h-full shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <span className="text-center text-sm md:text-base font-medium text-gray-800 line-clamp-2">
                {category?.category?.title}
              </span>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
