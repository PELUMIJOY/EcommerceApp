import React from "react";

const Indicator = ({ items = [] }) => {
  return (
    <div className="flex">
      {items.map((item, idx) => (
        <div key={"nav" + idx}>
          <p className={item.isActive ? "page-sub_title" : ""}>
            {item.name}
            {idx + 1 < items.length ? <span> {`>>`} </span> : null}
            &nbsp;
          </p>
        </div>
      ))}
    </div>
  );
};

export default Indicator;
