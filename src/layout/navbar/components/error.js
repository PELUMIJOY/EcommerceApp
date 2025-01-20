import React from "react";
import { Button } from "antd";
import Link  from "next/link"

export default function Error() {
  return (
    <div className="w-full text-center p-10">
      <p className="m-10 text-lg font-semibold">Sorry, Page Unavailable</p>

      <Link to="/">
        <Button type="primary" className="bg-yellow-500 text-white hover:bg-yellow-600">
          Home
        </Button>
      </Link>
    </div>
  );
}
