import React, { ReactNode } from "react";

type Props = { children: ReactNode };

function LayoutMobile({ children }: Props) {
  return (
    <div className="flex justify-center items-center w-full overflow-y-auto bg-white">
      <div className="h-full w-full">{children}</div>
    </div>
  );
}

export default LayoutMobile;
