import { Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories, fetchItems } from "../../../api";

export default function Recommended() {
  const navigate = useNavigate(); 
  const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);


  // const categories = [
  //   {
  //     name: "Phones & Tablets",
  //     image: "https://ng.jumia.is/cms/0-1-christmas-sale/2022/thumbnails/phones_220x220.png",
  //     route: "/category/phonestablets",
  //   },
  //   {
  //     name: "Up to 30% off",
  //     image: "https://ng.jumia.is/cms/0-1-homepage/0-0-thumbnails/clearance_220x220.png",
  //     route: "/category/deals",
  //   },
  //   {
  //     name: "Television",
  //     image: "https://ng.jumia.is/cms/0-1-weekly-cps/0-2023/01-thumbnails/Television.jpg",
  //     route: "/category/electronics",
  //   },
  //   {
  //     name: "Groceries",
  //     image: "https://ng.jumia.is/cms/0-1-christmas-sale/2022/thumbnails/groceries_220x220.png",
  //     route: "/category/supermarket",
  //   },
  //   {
  //     name: "Refrigerators",
  //     image: "https://ng.jumia.is/cms/0-1-weekly-cps/0-2023/01-thumbnails/refreigerator.jpg",
  //     route: "/category/electronics",
  //   },
  //   {
  //     name: "Electronics",
  //     image: "https://ng.jumia.is/cms/0-1-christmas-sale/2022/thumbnails/electronics_220x220.png",
  //     route: "/category/electronics",
  //   },
  //   {
  //     name: "Best Sellers",
  //     image: "https://ng.jumia.is/cms/0-1-weekly-cps/0-2023/01-thumbnails/Best_Seller.png",
  //     route: "/category/best-sellers",
  //   },
   
  // ];
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
// console.log(items, "fetching items");


  return (
    <div className="pt-5">
    {/* <Row gutter={[14, 14]} justify="center"> */}
    <Row gutter={[10, 12]} justify={"space-between"}>
    {/* <Col span={12}> */}
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

