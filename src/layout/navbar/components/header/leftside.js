import React from "react";
import { Menu } from "antd";
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
} from "@ant-design/icons";
import SidebarMenuItem from "./SidebarMenuItem";

export default function Leftside() {
  return (
    <div className="hidden md:inline md:w-[40%] lg:w-[20%]">
      <div className="items-start bg-white p-4 h-full rounded-md shadow-2xl">
        {/* Sidebar Menu Items */}
        <Menu mode="inline" className="border-none flex flex-col gap-3">
          <SidebarMenuItem
            link="supermarket"
            text="Supermarket"
            Icon={ShoppingOutlined}
            active
          />
          <SidebarMenuItem
            link="healthbeauty"
            text="Health & Beauty"
            Icon={MedicineBoxOutlined}
          />
          <SidebarMenuItem
            link="homeoffice"
            text="Home & Office"
            Icon={HomeOutlined}
          />
          <SidebarMenuItem
            link="appliances"
            text="Appliances"
            Icon={AppstoreOutlined}
          />
          <SidebarMenuItem
            link="phonestablets"
            text="Phones & Tablets"
            Icon={MobileOutlined}
          />
          <SidebarMenuItem
            link="computing"
            text="Computing"
            Icon={LaptopOutlined}
          />
          <SidebarMenuItem
            link="electronics"
            text="Electronics"
            Icon={CustomerServiceOutlined}
          />
          <SidebarMenuItem
            link="fashion"
            text="Fashion"
            Icon={SkinOutlined}
          />
          <SidebarMenuItem
            link="babyproducts"
            text="Baby Products"
            Icon={BugOutlined}
          />
          <SidebarMenuItem
            link="gaming"
            text="Gaming"
            Icon={SmileOutlined}
          />
          <SidebarMenuItem
            link="sportinggoods"
            text="Sporting Goods"
            Icon={TrophyOutlined}
          />
          <SidebarMenuItem
            link="othercategories"
            text="Other Categories"
            Icon={BarsOutlined}
          />
        </Menu>
      </div>
    </div>
  );
}
