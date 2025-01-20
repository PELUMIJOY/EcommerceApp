// import React from "react";

// export default function Rightside() {
//   return (
//     <div className="hidden lg:inline lg:w-[20%] flex flex-col p-2 pt-0 ">
//       <img
//         src="https://ng.jumia.is/cms/0-1-cpr/2022/june-14/free-delivery_218x184.png"
//         className=" w-full  mb-1  h-[50%] shadow-lg rounded-sm"
//         alt="image"
//       />
//       <img
//         src="https://ng.jumia.is/cms/0-1-initiatives/jforce/2023/JForce.png"
//         className=" h-[50%] w-full shadow-lg  rounded-sm"
//         alt="image"
//       />
//     </div>
//   );
// }

import React from "react";
import { Card } from "antd";

export default function Rightside() {
  return (
    <div className="hidden lg:flex lg:w-[20%] flex-col p-2 pt-0 space-y-2">
      {/* First Image */}
      <Card
        hoverable
        cover={
          <img
            src="https://ng.jumia.is/cms/0-1-cpr/2022/june-14/free-delivery_218x184.png"
            alt="Free Delivery"
            className="rounded-sm"
          />
        }
        className="h-[50%] shadow-lg"
      />

      {/* Second Image */}
      <Card
        hoverable
        cover={
          <img
            src="https://ng.jumia.is/cms/0-1-initiatives/jforce/2023/JForce.png"
            alt="JForce Initiative"
            className="rounded-sm"
          />
        }
        className="h-[50%] shadow-lg"
      />
    </div>
  );
}

