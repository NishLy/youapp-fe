"use client";

import classNames from "classnames";
import { useField } from "formik";
import React, { useState } from "react";
import { IoIosEyeOff, IoIosEye } from "react-icons/io";

type InputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  leadingIcon?: React.ReactNode;
  onClickLeadingIcon?: () => void;
  className?: string;
  inputClassName?: string;
  type?: "text" | "password" | "date" | "number" | "email";
  disabled?: boolean;
  readOnly?: boolean;
};

function Input({
  name,
  label,
  placeholder = "Type here...",
  leadingIcon,
  onClickLeadingIcon,
  className,
  type = "text",
  inputClassName,
  disabled,
  readOnly,
}: InputProps) {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div>
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <div
        className={classNames(
          "flex items-center rounded-lg border-0 bg-white/10 outline-0 p-4",
          className
        )}
      >
        <input
          {...field}
          disabled={disabled}
          readOnly={readOnly}
          type={inputType}
          placeholder={placeholder}
          className={classNames(
            "w-full bg-transparent text-lg outline-none placeholder:text-gray-400",
            inputClassName
          )}
        />
        {leadingIcon && (
          <span
            onClick={onClickLeadingIcon}
            className="mr-2 text-gray-400 flex-shrink-0 cursor-pointer"
          >
            {leadingIcon}
          </span>
        )}
        {isPassword && (
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="ml-2 text-gray-400 cursor-pointer"
          >
            {showPassword ? <IoIosEyeOff size={20} /> : <IoIosEye size={20} />}
          </span>
        )}
      </div>

      {meta.touched && meta.error ? (
        <p className="text-red-500 text-sm mt-1">{meta.error}</p>
      ) : null}
    </div>
  );
}

export default Input;
