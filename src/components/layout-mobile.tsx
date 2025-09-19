import React, { ReactNode } from "react";

type Props = { children: ReactNode };

function LayoutMobile({ children }: Props) {
  return (
    <div className="flex justify-center items-center w-full h-screen py-10 bg-white">
      <div className="h-full aspect-[9/18]">{children}</div>
    </div>
  );
}

export default LayoutMobile;
