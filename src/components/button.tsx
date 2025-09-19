import classNames from "classnames";
import React, { ReactNode } from "react";

type Props = {
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
};

function Button(props: Props) {
  return (
    <button
      className={classNames(
        "bg-linear-background-light rounded-md px-4 py-4 text-lg font-bold",
        props.className
      )}
    >
      {props.children}
    </button>
  );
}

export default Button;
