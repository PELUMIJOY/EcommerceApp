import React, { useEffect, useState } from "react";
import Post from "./post";
import RecomHeader from "./header";
// import { fetchProductsByBrand } from "@/lib/fetchData";
import { Skeleton } from "antd";
import { formatCurrency } from "../../utils/helper";

export default function Oraimo() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      // const products = await fetchProductsByBrand("Oraimo");
      const products = [
        { id: 1, title: "Oraimo Product 1", url: "image1.jpg", productprice: 1000 },
        { id: 2, title: "Oraimo Product 2", url: "image2.jpg", productprice: 1500 },
        // Add more products here
      ];
      setPosts(products);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div className="pt-5">
      <RecomHeader title="Oraimo Products" color="bg-green-800" />
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
