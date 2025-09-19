import React from "react";
import { IoIosArrowBack } from "react-icons/io";

type Props = {};

function Back({}: Props) {
  return (
    <div className="flex gap-2">
      <IoIosArrowBack />
      Back
    </div>
  );
}

export default Back;
