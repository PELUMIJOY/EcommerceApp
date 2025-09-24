import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  QuestionCircleOutlined,
  DownOutlined,
  UpOutlined,
  CloseOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Menu, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import Elementthree from "./elementthree";
import ShoppingCart from "./shoppingcart";
import TableSearch from "../../common/TableSearch";
import joyceStoreLogo from "../../assets/logo/joycestore-logo.svg";
import { fetchCategories, fetchItems } from "../../api";
import { getCurrentUser } from "../../utils/auth-client";
import { loginSuccess } from "../../app/authSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const cart = useSelector((state) => state.cart?.items);
  // const user = useSelector((state) => state.auth.user);
  const [searchValue, setSearchValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const reduxUser = useSelector((state) => state.auth.user);
  const [currentUser, setCurrentUser] = useState(reduxUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          dispatch(loginSuccess({ user, token: user.token }));
          setCurrentUser(user);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, [dispatch]);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        // Assume data is an array of category objects
        setCategoriesData(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, []);

  const handleMenuClick = ({ key }) => {
    if (key === "signin") {
      loginWithRedirect();
    } else {
      navigate(`/${key}`);
    }
    setDropdownOpen(false);
  };

  const dropdownMenu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          key: "login",
          label: (
            <Button className="w-full bg-orange-500 text-white font-bold">
              Sign In
            </Button>
          ),
        },
        {
          key: "register",
          label: (
            <div className="flex items-center gap-2">
              <UserOutlined />
              <span>My Account</span>
            </div>
          ),
        },
        {
          key: "orders",
          label: (
            <div className="flex items-center gap-2">
              <ShoppingOutlined />
              <span>Orders</span>
            </div>
          ),
        },
        // {
        //   key: "saved",
        //   label: (
        //     <div className="flex items-center gap-2">
        //       <HeartOutlined />
        //       <span>Saved Items</span>
        //     </div>
        //   ),
        // },
      ]}
    />
  );

  const helpMenu = (
    <Menu
      items={[
        {
          key: "help-center",
          label: (
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                {/* <QuestionCircleOutlined /> */}
                <span>Help Center</span>
              </div>
              <div className="flex flex-col mt-2 space-y-1">
                <span>Place an order</span>
                <span>Payment options</span>
                <span>Track an order</span>
                <span>Cancel an order</span>
                <span>Returns & Refunds</span>
              </div>
              {/* <img
                src="/help-dropdown.png"
                alt="Help Menu Example"
                className="mt-2 w-full"
              /> */}
            </div>
          ),
        },
      ]}
    />
  );
  const handleDropdownVisibleChange = (visible) => {
    setDropdownOpen(visible);
  };

  const handleSearch = async () => {
    const trimmed = searchValue.trim();
    if (!trimmed) return;
    const lowerQuery = trimmed.toLowerCase();

    const matchedCategory = categoriesData.find(
      (cat) => cat.title.toLowerCase() === lowerQuery
    );
    if (matchedCategory) {
      navigate(`/category/${matchedCategory.title.toLowerCase()}`);
      return;
    }

    try {
      const products = await fetchItems({ name: trimmed });

      const matchedProduct = products.find(
        (prod) => prod.name.toLowerCase() === lowerQuery
      );
      if (matchedProduct) {
        navigate(`/product/${matchedProduct._id}`, {
          state: { product: matchedProduct },
        });
      } else {
        notification.error({
          message: "Product Not Found",
          description: "No product matches the search term.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Search Error",
        description: "An error occurred while searching for products.",
      });
    }
  };

  const clearSearch = () => {
    setSearchValue("");
    navigate("/");
  };

  return (
    <>
      {/* Top Line for Sell and Jumia Pay */}
      <div className="bg-orange-500 py-2">
        <div className="md:max-w-7xl mx-auto flex justify-between items-center px-4 text-sm">
          <button
            className="text-white font-bold hover:underline "
            onClick={() => navigate("/sell")}
          >
            Sell on Didara Nigeria
          </button>
          {/* <span className="text-gray-700 font-medium">
            JOYCESTORE <span className="text-orange-500">Pay</span>
          </span> */}
        </div>
      </div>
      {/* Top Banner */}
      {/* <div className="bg-orange-500 mb-3">
        <div className="mx-auto w-full align-middle md:max-w-7xl">
          <img
            src="https://ng.jumia.is/cms/0-1-cpr/2023/new-top-strip/free-delivery-top-strip_1.gif"
            alt="Free Delivery Banner"
          />
        </div>
      </div> */}

      {/* Navbar */}
      <div className="bg-white">
        <div className="md:max-w-7xl mx-auto flex py-3 justify-between items-center">
          {/* Logo and Menu */}
          {/* <span className="flex space-x-2 items-center">
            <Elementthree />
            {/* <img
              src={jumiaLogo}
              className="h-[40px] cursor-pointer"
              alt="Joyce Logo"
              onClick={() => navigate("/")}
            /> */}
          {/* <img src={joyceStoreLogo} alt="JOYCESTORE Logo" className="h-[50px] cursor-pointer" onClick={() => navigate("/")}/> */}
          {/* <h2 className="">Didara Nigeria</h2>
  <small>Made in Nigeria flagship mall</small>
          </span> */}

          <span className="flex flex-col space-y-1 justify-start ">
            <Elementthree />
            <div>
              <h2 className="font-bold leading-tight">
                <span className="text-orange-500 ml-10 font-extrabold">
                  Didara
                </span>{" "}
                <span className="text-black font-extrabold">Nigeria</span>
              </h2>
              <small className="block text-sm text-gray-600 align-middle">
                Made in Nigeria flagship mall
              </small>
            </div>
          </span>
          <div className="w-[500px] flex flex-2 gap-2 h-[40px]">
            <TableSearch
              placeholder="Search Products and categories"
              className="w-full"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              allowClear={{
                clearIcon: (
                  <div onClick={clearSearch}>
                    <CloseOutlined />
                  </div>
                ),
              }}
            />
            <Button
              className="bg-orange-500 text-[#FFF] h-[40px] text-md "
              onClick={handleSearch}
            >
              SEARCH
            </Button>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <Dropdown
                overlay={dropdownMenu}
                trigger={["click"]}
                // visible={dropdownVisible}
                onVisibleChange={handleDropdownVisibleChange}
              >
                <div className="cursor-pointer flex items-center space-x-2">
                  <Avatar icon={<UserOutlined />} />

                  <span>Hi, {currentUser.name}</span>
                </div>
              </Dropdown>
            ) : (
              <Dropdown
                overlay={dropdownMenu}
                trigger={["click"]}
                open={dropdownOpen}
                onVisibleChange={handleDropdownVisibleChange}
              >
                <div className="cursor-pointer">
                  <Button className="border-none flex items-center">
                    <UserOutlined className="mr-1" />
                    Account
                    {dropdownOpen ? (
                      <UpOutlined className="ml-1" />
                    ) : (
                      <DownOutlined className="ml-1" />
                    )}
                  </Button>
                </div>
              </Dropdown>
            )}
            {/* Help Dropdown */}
            <Dropdown overlay={helpMenu} trigger={["click"]}>
              <Button className="border-none flex items-center">
                <QuestionCircleOutlined className="mr-1" />
                Help
                <DownOutlined className="ml-1" />
              </Button>
            </Dropdown>
            {/* Shopping Cart */}
            <ShoppingCart items={cart?.length} />
          </div>
        </div>
      </div>
    </>
  );
}
