import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { IoIosArrowBack } from "react-icons/io";

type Props = {
  title?: ReactNode;
  rightIcon?: ReactNode;
};

function Back({ title, rightIcon: back }: Props) {
  const router = useRouter();
  return (
    <div className="flex gap-2 items-center justify-between sticky">
      <div className="flex gap-1 items-center font-bold">
        {" "}
        <IoIosArrowBack className="w-6 h-6" onClick={() => router.back()} />
        Back
      </div>
      <div>{title}</div>
      <div>{back}</div>
    </div>
  );
}

export default Back;
