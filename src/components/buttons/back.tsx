import React from "react";
import { IoIosArrowBack } from "react-icons/io";

type Props = {
  title?: string;
};

function Back({ title }: Props) {
  return (
    <div className="flex gap-2 items-center justify-between">
      <div className="flex gap-2 items-center">
        {" "}
        <IoIosArrowBack className="w-6 h-6" />
        Back
      </div>
      <div>{title}</div>
      <div></div>
    </div>
  );
}

export default Back;
