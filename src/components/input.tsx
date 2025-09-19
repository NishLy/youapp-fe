"use client";

import classNames from "classnames";
import React from "react";

type InputProps = {
  value?: string;
  placeholder?: string;
  leadingIcon?: React.ReactNode;
  onClickLeadingIcon?: () => void;
  onChange?: (value: string) => void;
  className?: string;
};

function Input({
  value,
  placeholder = "Type here...",
  leadingIcon,
  onChange,
  className,
}: InputProps) {
  return (
    <div
      className={classNames(
        "flex items-center rounded-md border-0  bg-white/10 outline-0 p-4",
        className
      )}
    >
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full bg-transparent text-lg outline-none placeholder:text-gray-400"
      />
      {leadingIcon && (
        <span className="mr-2 text-gray-400 flex-shrink-0">{leadingIcon}</span>
      )}
    </div>
  );
}

export default Input;
