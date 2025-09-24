import { useEffect, useState } from "react";
import {
  ShoppingOutlined,
  MedicineBoxOutlined,
  HomeOutlined,
  AppstoreOutlined,
  MobileOutlined,
  LaptopOutlined,
  CustomerServiceOutlined,
  SkinOutlined,
  BugOutlined,
  SmileOutlined,
  TrophyOutlined,
  BarsOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import moment from "moment";

export const formatCurrency = (amount) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  });
  return formatter.format(amount);
};

export function calculateSum(array) {
  let total = 0;

  for (const value of array) {
    total += value;
  }

  return total;
}

export const useIsMobileView = () => {
  const [mobile, setMobile] = useState(false);
  // const { width } = useWindowSize();
  const [windowSize, setWindowSize] = useState(undefined);

  // Handler to call on window resize
  function handleResize() {
    // Set window width to state
    setWindowSize(window.innerWidth);
  }

  useEffect(() => {
    // Add event listener
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [windowSize]); // Empty array ensures that effect is only run on mount

  useEffect(() => {
    if (windowSize < 720) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [windowSize]);

  return mobile;
};

export const HumanFriendlyDate = (dateTime) => {
  if (!dateTime || dateTime === "NA") {
    return "N/A";
  }

  const _dateTime = moment(dateTime);
  return `${_dateTime.format("Do MMM, YYYY")}`;
};

export const menuItems = [
  {
    link: "/category/supermarket",
    text: "Supermarket",
    Icon: ShoppingOutlined,
  },
  {
    link: "/category/healthbeauty",
    text: "Health & Beauty",
    Icon: MedicineBoxOutlined,
  },
  { link: "/category/art", text: "Art & Gallery", Icon: PictureOutlined },
  { link: "/category/homeoffice", text: "Home & Office", Icon: HomeOutlined },
  { link: "/category/appliances", text: "Appliances", Icon: AppstoreOutlined },
  {
    link: "/category/phonestablets",
    text: "Phones & Tablets",
    Icon: MobileOutlined,
  },
  { link: "/category/computing", text: "Computing", Icon: LaptopOutlined },
  {
    link: "/category/electronics",
    text: "Electronics",
    Icon: CustomerServiceOutlined,
  },
  { link: "/category/fashion", text: "Fashion", Icon: SkinOutlined },
  { link: "/category/babyproducts", text: "Baby Products", Icon: BugOutlined },
  { link: "/category/gaming", text: "Gaming", Icon: SmileOutlined },
  {
    link: "/category/sportinggoods",
    text: "Sporting Goods",
    Icon: TrophyOutlined,
  },
  {
    link: "/category/othercategories",
    text: "Other Categories",
    Icon: BarsOutlined,
  },
];
