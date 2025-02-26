"use client";
import Category from "../category/Category";
import SliderMainPage from "../mainPage/SliderMainPage";
import Gaming from "../recommended/gaming";
import Recommended from "../recommended/recommended";
import Recommendedforu from "../recommended/recommendedforu";
import Leftside from "./leftside";
import Middle from "./middle";
import Rightside from "./rightside";

export default function Header() {
  return (
    <div>
      <div className="flex w-full pt-2 md:space-x-3">
        {/* Left  side */}
        <Leftside />

        {/* Middle */}
        <Middle />

        {/* Right side */}
        <Rightside />
      </div>
      {/* <Category/> */}
      <Recommended />
      <SliderMainPage />

      <Recommendedforu />

      {/* <Gaming /> */}
    </div>
  );
}
