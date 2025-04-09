import React, { useState, useEffect } from "react";
import Breadcrumbs from "./breadcrumbs";
import { FacebookOutlined, TwitterOutlined } from "@ant-design/icons";
import Moredetails from "./moredetails";
import Delivery from "./delivery";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  addItemToCart,
  selectCartItems,
  addToRecentlyViewed
} from "../../../app/cartSlice";
import { Card, Button, Badge, Carousel, Rate, notification, InputNumber } from "antd";
import { useLocation, useParams } from "react-router-dom";
import RecentlyViewed from "./RecentlyViewed";


export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const { product: details } = location.state || {};
  const user = useSelector((state) => state.auth.user);
  const recentlyViewed = useSelector((state) => state.cart.recentlyViewed || []);

  const cartItems = useSelector(selectCartItems);
  const existingCartItem = cartItems.find((item) => item.id === details?.id);

  const [quantity, setQuantity] = useState(existingCartItem?.quantity || 0);
  const maxStock = details?.stock || 0;

  useEffect(() => {
    // Update quantity when cart changes
    if (existingCartItem) {
      setQuantity(existingCartItem.quantity);
    }
  }, [existingCartItem]);

  useEffect(() => {
    // Add product to recently viewed when component mounts
    if (details) {
      dispatch(addToRecentlyViewed(details));
    }
  }, [details, dispatch]);

  if (!details) {
    return <p>No product details available.</p>;
  }

  const addToCartHandler = () => {
    dispatch(addToCart(details));
    
    if (user) {
      dispatch(addItemToCart({
        userId: user._id,
        productId: details.id,
        quantity: 1,
        product: details
      }));
    }
    
    setQuantity(1);
    notification.success({ message: "Product added successfully" });
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    dispatch(updateQuantity({ id: details.id, quantity: newQuantity }));
    
    if (user) {
      dispatch(addItemToCart({
        userId: user._id,
        productId: details.id,
        quantity: 1,
        product: details
      }));
    }
    
    notification.success({ message: "Product added successfully" });
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      dispatch(updateQuantity({ id: details.id, quantity: newQuantity }));
      
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
        title={details.title || details.name}
      />

      <div className="flex flex-col lg:flex-row p-3 space-x-4">
        <div className="w-full lg:w-[70%]">
          <div className="flex">
            <div className="w-[35%]">
              <Carousel autoplay>
                <img
                  src={details.imageUrl || details.url}
                  alt={`Product Image`}
                  className="w-full rounded-md"
                />
              </Carousel>

              <span className="text-lg mt-4 block">SHARE THIS PRODUCT</span>
              <p className="space-x-5 mt-1">
                <FacebookOutlined className="text-xl text-blue-600" />
                <TwitterOutlined className="text-xl text-blue-400" />
              </p>
            </div>
            <div className="w-[65%] pl-4">
              <Badge.Ribbon text={details.brand} color="blue" />
              <p className="text-2xl font-bold mt-2">{details.name || details.title}</p>
              <hr className="my-2" />
              <div className="flex items-center space-x-2">
                <b className="text-3xl text-black">
                  {details.price.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  })}
                </b>
                {details?.oldPrice && (
                  <span className="line-through text-gray-400 text-lg">
                    {details.oldPrice.toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })}
                  </span>
                )}
                {details?.discount && (
                  <span className="text-red-600 text-lg">
                    -{details.discount}%
                  </span>
                )}
              </div>

              {/* <p className="text-sm text-gray-400 mt-2">
                {details.stock === 0 ? (
                  <span className="text-red-600">Out of Stock</span>
                ) : (
                  "In Stock"
                )} */}
                 <div className="mt-3 text-lg">
                {maxStock <= 0 ? (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                ) : (
                  <span className="text-green-600">
                    In Stock <span className="text-sm">({maxStock} items available)</span>
                  </span>
                )}
              </div>
                <Rate
                  allowHalf
                  defaultValue={details.rating || 4}
                  className="mt-2"
                />
                <p className="text-gray-400 text-sm">
                  ({details.reviewsCount || 0} verified ratings)
                </p>
              {/* </p> */}

              <p className="mt-2">
                {!details?.deliveryPrice ? (
                  <span className="text-green-600">Free Delivery</span>
                ) : (
                  <span className="text-gray-500">
                    + shipping from{" "}
                    {details?.deliveryPrice.toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })}
                  </span>
                )}
              </p>

              {/* {maxStock > 0 && (
                quantity === 0 ? (
                  <Button
                    type="primary"
                    block
                    className="bg-orange-500 mt-5 text-xl"
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <div className="mt-5">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-sm">Quantity:</span>
                      <InputNumber
                        min={0}
                        max={maxStock}
                        value={quantity}
                        onChange={updateCartQuantity}
                        className="w-20"
                      />
                      <span className="text-sm text-gray-500">
                        (Max: {maxStock})
                      </span>
                    </div>
                    </div>
                  )
                )}

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
                  <span className="text-xl">{quantity}</span>
                  <Button
                    type="primary"
                    onClick={incrementQuantity}
                    className="bg-orange-500 text-lg"
                  >
                    +
                  </Button>
                  <p> {quantity} item(s) added </p>
                </div>
              )} */}
{maxStock > 0 && (
  quantity === 0 ? (
    <Button
      type="primary"
      block
      className="bg-orange-500 mt-5 text-xl"
      onClick={addToCartHandler}
    >
      Add to Cart
    </Button>
  ) : (
    <div className="mt-5 space-y-3">
      <div className="flex items-center space-x-3">
        <span className="text-sm">Quantity:</span>
        <InputNumber
          min={1}
          max={maxStock}
          value={quantity}
          // onChange={updateCartQuantity}
          className="w-20"
        />
        <span className="text-sm text-gray-500">
          (Max: {maxStock})
        </span>
      </div>

      <div className="flex items-center space-x-3">
        <Button
          type="primary"
          onClick={decrementQuantity}
          className="bg-orange-500 text-lg"
          disabled={quantity <= 1}
        >
          -
        </Button>
        <span className="text-xl">{quantity}</span>
        <Button
          type="primary"
          onClick={incrementQuantity}
          className="bg-orange-500 text-lg"
          disabled={quantity >= maxStock}
        >
          +
        </Button>
        <p>{quantity} item(s) added</p>
      </div>
    </div>
  )
)}


              <hr className="my-2" />
              <p className="font-semibold mt-4"> Promotions</p>
              <p>Call 07006000000 To Place Your Order</p>
              <p>Need extra money? Loan up to N500,000 on the JumiaPay Android app.</p>
              <p>Enjoy cheaper shipping fees when you select a PickUp Station at checkout.</p>
            </div>
          </div>

          <Moredetails
            specifications={details.specifications}
            details={details.description}
            features={details.features}
          />
          
          {/* Display Recently Viewed products */}
          {recentlyViewed.length > 0 && (
            <RecentlyViewed items={recentlyViewed.filter(item => item.id !== details.id).slice(0, 4)} />
          )}
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