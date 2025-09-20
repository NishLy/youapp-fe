import classNames from "classnames";
import React, { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button(props: Props) {
  return (
    <button
      {...props}
      className={classNames(
        "bg-linear-background-light rounded-md px-4 py-4 text-lg font-bold",
        props.className,
        props.disabled ? "brightness-50" : null
      )}
    >
      {props.children}
    </button>
  );
}

export default Button;
