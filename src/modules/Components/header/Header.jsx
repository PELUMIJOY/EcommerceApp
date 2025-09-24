"use client";
import Category from "../category/Category";
import SliderMainPage from "../mainPage/SliderMainPage";
import Gaming from "../recommended/gaming";
import Recommended from "../recommended/recommended";
import Recommendedforu from "../recommended/recommendedforu";
import Middle from "./middle";
import Rightside from "./rightside";

export default function Header() {
  return (
    <div className="w-full">
      <div className="flex w-full pt-2 md:space-x-3">
        {/* Middle */}
        <div className="flex-1">
          <Middle />
        </div>

        {/* Right side */}
        <div className="w-80 hidden lg:block">
          <Rightside />
        </div>
      </div>

      <Recommended />
      <Recommendedforu />
    </div>
  );
}
