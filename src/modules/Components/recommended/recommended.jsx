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
    <div className="pt-5">
    <Row gutter={[10, 12]} justify={"space-between"}>

      {items?.map((category, index) => (
        <Col key={index} xs={10} sm={8} md={6} lg={4}>
          <Card
            hoverable
            cover={
              <img
                src={category?.imageUrl}
                alt={category?.category?.title}
                className="h-[150px] object-cover"
                // onClick={() => navigate(category?.category)}
              />
            }
            onClick={() => navigate(`/category/${category?.category?.title}`)}
            bodyStyle={{ textAlign: "center" }}
          >
            <span className="text-center text-sm md:text-base mt-2">{category?.category?.title}</span>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);
}

