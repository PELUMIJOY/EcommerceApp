import React from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;

export default function Moredetails({ specifications, details, features }) {
  return (
    <Collapse className="mt-2 rounded-lg shadow-lg">
      <Panel header="Product Details" key="1">
        <p>{details}</p>
      </Panel>
      <Panel header="Product Specifications" key="2">
        <p>{specifications}</p>
      </Panel>
      <Panel header="Product Features" key="3">
        <p>{features}</p>
      </Panel>
    </Collapse>
  );
}
