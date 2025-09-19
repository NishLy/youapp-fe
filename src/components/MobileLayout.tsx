import classNames from "classnames";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const MobileLayout = (props: Props) => {
  return (
    <div className="flex flex-col h-full">
      <header>Status bar</header>
      <main className={classNames("min-h-full w-full", props.className)}>
        {props.children}
      </main>
    </div>
  );
};

export default MobileLayout;
