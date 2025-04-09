import DashboardShell from "../layout/DashboardShell";
import CustomerLogin from "../modules/Auth/CustomerLogin";
import SignUp from "../modules/Auth/SignUp";
import SignUpCustomer from "../modules/Auth/SignUpCustomer";
import VendorLogin from "../modules/Auth/VendorLogin";
import Cart from "../modules/Components/cartItems/Cart";
import Category from "../modules/Components/category/Category";
import Checkout from "../modules/Components/checkout/Checkout";
import Header from "../modules/components/header/Header";
import OrdersPage from "../modules/Components/OrdersPage";
import ProductDetail from "../modules/Components/productDetails/ProductDetail";
import SellOnJumia from "../modules/Components/SellOnJumia/SellOnJumia";
import AddCategory from "../modules/Components/VendorCenter/AddCategory";
import AddProduct from "../modules/Components/VendorCenter/AddProduct";
import ManageOrder from "../modules/Components/VendorCenter/ManageOrder";
import ManageProducts from "../modules/Components/VendorCenter/ManageProduct";
import Vendor from "../modules/Components/VendorCenter/Vendor";

const routes = [
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/register",
    element: <SignUpCustomer />,
  },
  {
    path: "/login",
    element: <CustomerLogin />,
  },
  {
    path: "/vendorlogin",
    element: <VendorLogin />,
  },

  {
    path: "/vendor",
    element: <Vendor />,
    children: [
      {
        index: true,
        element: <AddProduct />,
      },
      {
        path: "addProduct",
        element: <AddProduct />,
      },
      {
        path: "addCategory",
        element: <AddCategory />,
      },
      {
        path: "products",
        element: <ManageProducts />,
      },
      {
        path: "orders",
        element: <ManageOrder />,
      },
    ],
  },

  {
    path: "/",
    element: <DashboardShell />,
    children: [
      {
        index: true,
        element: <Header />,
      },
      { path: "category/:category", element: <Category /> },
      { path: "sell", element: <SellOnJumia /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "orders", element: <OrdersPage /> },
      
    ],
    Cart,
  },
];

export default routes;
