import React, { useState } from "react";
import Breadcrumbs from "./breadcrumbs";
import { FacebookOutlined, TwitterOutlined } from "@ant-design/icons";
import Moredetails from "./moredetails";
import Delivery from "./delivery";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  selectCartItems,
} from "../../../app/cartSlice";
import { Card, Button, Badge, Carousel, Rate, notification } from "antd";
import { useLocation } from "react-router-dom";

export default function ProductDetail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { product: details } = location.state || {};

  const cartItems = useSelector(selectCartItems);
  const existingCartItem = cartItems.find((item) => item.id === details?.id);

  const [quantity, setQuantity] = useState(existingCartItem?.quantity || 0);

  if (!details) {
    return <p>No product details available.</p>;
  }

  const addToCartHandler = () => {
    if (!existingCartItem) {
      dispatch(addToCart(details));
      setQuantity(1);
      notification.success({ message: "Product added successfully" });
    }
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    dispatch(updateQuantity({ id: details.id, quantity: quantity + 1 }));
    notification.success({ message: "Product added successfully" });
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      dispatch(updateQuantity({ id: details.id, quantity: quantity - 1 }));
      notification.info({ message: "Item quantity has been updated" });
    } else if (quantity === 1) {
      dispatch(removeFromCart({ id: details.id }));
      setQuantity(0);
      notification.warning({ message: "Product was removed from cart successfully" });
    }
  };

  return (
    <div>
      <Breadcrumbs
        category={details.categories}
        brand={details.brand}
        title={details.title}
      />

      <div className="flex flex-col lg:flex-row p-3 space-x-4">
        <div className="w-full lg:w-[70%]">
          <div className="flex">
            <Card className="flex bg-white p-2 rounded-lg shadow-lg">
              <div className="w-[35%]">
                <Carousel autoplay>
                  {details.images?.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Product Image ${index + 1}`}
                      className="w-full rounded-md"
                    />
                  ))}
                </Carousel>

                <span className="text-lg mt-4 block">SHARE THIS PRODUCT</span>
                <p className="space-x-5 mt-1">
                  <FacebookOutlined className="text-xl text-blue-600" />
                  <TwitterOutlined className="text-xl text-blue-400" />
                </p>
              </div>
            </Card>
            <div className="w-[65%] pl-4">
              <Badge.Ribbon text={details.brand} color="blue" />
              <p className="text-2xl font-bold mt-2">{details.title}</p>
              <hr className="my-2" />
              <div className="flex items-center space-x-2">
                <b className="text-3xl text-black">
                  {details.productprice.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  })}
                </b>
                {details.oldPrice && (
                  <span className="line-through text-gray-400 text-lg">
                    {details.oldPrice.toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })}
                  </span>
                )}
                {details.discount && (
                  <span className="text-red-600 text-lg">
                    -{details.discount}%
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-400 mt-2">
                {details.units === 0 ? (
                  <span className="text-red-600">Out of Stock</span>
                ) : (
                  "In Stock"
                )}
                <Rate
                  allowHalf
                  defaultValue={details.rating}
                  className="mt-2"
                />
                <p className="text-gray-400 text-sm">
                  ({details.reviewsCount} verified ratings)
                </p>
              </p>

              <p className="mt-2">
                {!details.deliveryPrice ? (
                  <span className="text-green-600">Free Delivery</span>
                ) : (
                  <span className="text-gray-500">
                    + shipping from{" "}
                    {details.deliveryPrice.toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })}
                  </span>
                )}
              </p>

              {quantity === 0 ? (
                <Button
                  type="primary"
                  block
                  className="bg-orange-500 mt-5 text-xl"
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </Button>
              ) : (
                <div className="flex items-center mt-5 space-x-3">
                  <Button
                    type="primary"
                    onClick={decrementQuantity}
                    className="bg-orange-500 text-lg"
                  >
                    -
                  </Button>
                  <span className=" text-xl">{quantity}</span>
                  <Button
                    type="primary"
                    onClick={incrementQuantity}
                    className="bg-orange-500 text-lg"
                  >
                    +
                  </Button>
                  <p> {quantity} item(s) added </p>
                </div>
              )}

            </div>
          </div>

          <Moredetails
            specifications={details.specifications}
            details={details.details}
            features={details.features}
          />
        </div>

        {/* Delivery Section */}
        <div className="hidden lg:block lg:w-[30%]">
          <Delivery
            location={details.location}
            deliveryPrice={details.deliveryPrice}
            pickupOptions={details.pickupOptions}
          />
        </div>
      </div>
    </div>
  );
}
