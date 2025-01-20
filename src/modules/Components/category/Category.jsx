import React from "react";

// import { fetchProductsbyCategory } from "@/lib/fetchData";
import { Card } from "antd";
import CategoryDetails from "./Categorydetails";
import Indicator from "../../../common/Indicator";
import { Link, useParams } from "react-router-dom";
import { menuItems } from "../header/leftside";
import { products } from "../../../mockData";

export default function Category() {
  const { category } = useParams();
  const categoryText =
  menuItems.find((item) => item.link.includes(`/category/${category}`))
    ?.text || "Category";

  const IndicatorItems = [
    { name:<Link to="/">Home</Link> , isActive: false },
    { name: categoryText || "Category", isActive: true },
  ];



  const filteredProducts = products.filter(
    (product) => product.categories.toLowerCase() === category?.toLowerCase()
  );
  return (
    <div className="md:max-w-7xl mx-auto p-4">
      <div>
      {/* <p className="page-title">{category}</p> */}
          <Indicator items={IndicatorItems} />
        </div>
      <Card
        title={categoryText}
        bordered={false}
        className="shadow-lg rounded-lg"
      >
        <CategoryDetails products={filteredProducts} />
      </Card>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const category = context.params.category;
//   const mockProducts = [
//     { id: 1, title: "Mock Product 1", url: "image1.jpg", productprice: 1000, categories: "Electronics" },
//     { id: 2, title: "Mock Product 2", url: "image2.jpg", productprice: 2000, categories: "Electronics" },
//     { id: 3, title: "Mock Product 3", url: "image3.jpg", productprice: 3000, categories: "Electronics" },
//   ];

//   try {
//     // const products = await fetchProductsbyCategory(category);
//     // const products = ("category");

//     // return {
//     //   props: {
//     //     products,
//     //   },
//     // };
   
  
//     return {
//       props: {
//         products: mockProducts,
//       },
//     };
//   } catch (error) {
//     console.error("Failed to fetch products:", error);
//     return {
//       props: {
//         products: [],
//       },
//     };
//   }
// }
