import React, { Fragment } from "react";
import { Title } from "../";
export const Menu = ({
  selectedMenu,
  setSelectedMenu,
  data = [],
  setResponsiveMenu,
}) => {
  return (
    <Fragment>
      {data.map((item) => (
        <div
          key={item?.key}
          className={`p-2 rounded-md cursor-pointer hover:bg-gray-50
            m-0.5 ${
              selectedMenu === item?.key ? "sm:bg-gray-50 bg-white" : "bg-white"
            }`}
          onClick={() => {
            setResponsiveMenu(false);
            setSelectedMenu(item?.key);
          }}
        >
          <Title>{item?.label}</Title>
        </div>
      ))}
    </Fragment>
  );
};
