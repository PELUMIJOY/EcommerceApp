import React, { useEffect, useState } from "react";
import Post from "./post";
import RecomHeader from "./header";
// import { fetchProductsbyCategory } from "@/lib/fetchData";
import { Skeleton } from "antd";
import { formatCurrency } from "../../../utils/helper";
// import { formatCurrency } from "@/lib/help"; // Helper to format currency

const supermarket = [
  { id: 1, title: "Product 1", url: "image1.jpg", productprice: 1000 },
  { id: 2, title: "Product 2", url: "image2.jpg", productprice: 1500 },
  // Add more products as needed
];
export default function Recommendedforu() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const products = await fetchProductsbyCategory("supermarket");
        const products = supermarket;
        setPosts(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="pt-5">
      {/* Header */}
      <RecomHeader title="Supermarket" color="bg-blue-400" />

      {/* Product Carousel */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        {loading ? (
          <Skeleton active />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {posts.map((post) => (
              <Post
                key={post.id}
                title={post.title}
                image={post.url}
                price={formatCurrency(post.productprice)}
                id={post.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
