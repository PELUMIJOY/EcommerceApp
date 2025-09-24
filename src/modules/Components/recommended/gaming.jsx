import React, { useEffect, useState } from "react";
import Post from "./post";
import RecomHeader from "./header";
// import { fetchProductsbyCategory } from "@/lib/fetchData";
import { Skeleton } from "antd";
import { formatCurrency } from "../../../utils/helper";

const gaming = [
  { id: 1, title: "Gaming Product 1", url: "image1.jpg", productprice: 1500 },
  { id: 2, title: "Gaming Product 2", url: "image2.jpg", productprice: 2000 },
  // Add more products as needed
];
export default function Gaming() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      // const products = await fetchProductsbyCategory("gaming");
      const products = gaming;
      setPosts(products);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div className="pt-5">
      <RecomHeader title="Gaming" color="bg-red-400" />
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
