import React, { useEffect, useState } from "react";
import { Card } from "antd";
import CategoryDetails from "./Categorydetails";
import Indicator from "../../../common/Indicator";
import { Link, useParams } from "react-router-dom";
import { fetchItems } from "../../../api";
import { menuItems } from "../../../utils/helper";

export default function Category() {
  const { category } = useParams();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const categoryText =
    menuItems.find((item) => item.link.includes(`/category/${category}`))
      ?.text || "Category";

  const IndicatorItems = [
    { name: <Link to="/">Home</Link>, isActive: false },
    { name: categoryText || "Category", isActive: true },
  ];

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

  const filteredProducts = items.filter(
    (item) => item.category?.title.toLowerCase() === category?.toLowerCase()
  );
  return (
    <div className="w-full">
      <div>
        {/* <p className="page-title">{category}</p> */}
        <Indicator items={IndicatorItems} />
      </div>

      <Card
        title={categoryText}
        bordered={false}
        className="shadow-lg rounded-lg"
      >
        <CategoryDetails products={filteredProducts} loading={loading} />
      </Card>
    </div>
  );
}
