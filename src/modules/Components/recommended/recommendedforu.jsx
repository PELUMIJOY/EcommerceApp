import React, { useEffect, useState } from "react";
import Post from "./post";
import RecomHeader from "./header";
import { Skeleton } from "antd";
import { formatCurrency } from "../../../utils/helper";
import { fetchItems } from "../../../api";

export default function RecommendedForU() {
  const [categories, setCategories] = useState([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryItems = async () => {
      setLoading(true);
      try {
        const data = await fetchItems(); // Fetch all products
        // Group products by category ID
        const groupedCategories = data.reduce((acc, product) => {
          const categoryId = product.category?._id;
          if (!acc[categoryId]) {
            acc[categoryId] = {
              title: product.category?.title || "Unknown Category",
              products: [],
            };
          }
          acc[categoryId].products.push(product);
          return acc;
        }, {});

        setCategories(Object.values(groupedCategories));
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryItems();
  }, []);

  useEffect(() => {
    if (categories.length === 0) return;
    const interval = setInterval(() => {
      setCurrentCategoryIndex(
        (prevIndex) => (prevIndex + 1) % categories.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [categories]);

  const currentCategory = categories[currentCategoryIndex];

  return (
    <div className="pt-5">
      {/* Header */}
      <RecomHeader title={currentCategory?.title} color="bg-blue-400" />

      {/* Product Carousel */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        {loading ? (
          <Skeleton active />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentCategory?.products.length > 0 ? (
              currentCategory?.products.map((post) => (
                <Post
                  key={post._id}
                  title={post.name}
                  image={post.imageUrl}
                  price={formatCurrency(post.price)}
                  id={post._id}
                  onClick={() =>
                    navigate(`/category/${category?.category?.title}`)
                  }
                />
              ))
            ) : (
              <p>No products in this category</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
