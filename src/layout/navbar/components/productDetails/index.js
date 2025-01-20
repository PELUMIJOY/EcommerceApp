import React, { useState } from "react";
import Breadcrumbs from "./breadcrumbs";
import { FacebookOutlined, TwitterOutlined } from "@ant-design/icons";
import Moredetails from "./moredetails";
import Delivery from "./delivery";
import { useSelector, useDispatch } from "react-redux"; 
import {addItem} from "@/app/cartSlice"
import { Card, Button, Badge } from "antd";

export default function ProductDetail({ details }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const addToCart = () => {
    dispatch(addItem(details));
  };

  if (!details) {
    return null;
  }

  return (
    <div>
      <Breadcrumbs
        category={details.categories}
        brand={details.brand}
        title={details.title}
      />

      <div className="flex flex-col lg:flex-row p-3 space-x-4">
        {/* Product Image and Sharing */}
        <div className="w-full lg:w-[70%]">
          <Card className="flex bg-white p-2 rounded-lg shadow-lg">
            <div className="w-[35%]">
              <img
                src={details.url}
                alt="Product Detail"
                className="w-full"
              />
              <span className="text-lg mt-2 block">SHARE THIS PRODUCT</span>
              <p className="space-x-5 mt-1">
                <FacebookOutlined className="text-xl text-blue-600" />
                <TwitterOutlined className="text-xl text-blue-400" />
              </p>
            </div>

            {/* Product Details */}
            <div className="w-[65%] pl-4">
              <Badge.Ribbon text={details.brand} color="blue" />
              <p className="text-2xl font-bold mt-2">{details.title}</p>
              <p className="mt-1">
                Brand:{" "}
                <span className="text-blue-500 hover:underline cursor-pointer">
                  {details.brand}
                </span>
              </p>
              <hr className="my-2" />
              <b className="text-3xl">{details.productprice.toLocaleString("en-NG", { style: "currency", currency: "NGN" })}</b>

              <p className="text-sm text-gray-400 mt-2">
                {details.units === 0 ? (
                  <span className="text-red-600">Out of Stock</span>
                ) : (
                  "In Stock"
                )}
              </p>

              <p className="mt-2">
                {!details.deliveryPrice ? (
                  <span className="text-green-600">Free Delivery</span>
                ) : (
                  <span className="text-gray-500">
                    + shipping from {details.deliveryPrice.toLocaleString("en-NG", { style: "currency", currency: "NGN" })}
                  </span>
                )}
              </p>

              <Button
                type="primary"
                block
                className="mt-5 text-xl"
                onClick={addToCart}
              >
                Add to Cart
              </Button>
            </div>
          </Card>

          <Moredetails
            specifications={details.specifications}
            details={details.details}
            features={details.features}
          />
        </div>

        {/* Delivery Section */}
        <div className="hidden lg:block lg:w-[30%]">
          <Delivery />
        </div>
      </div>
    </div>
  );
}
