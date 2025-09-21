"use client";

import classNames from "classnames";
import { useField } from "formik";
import React from "react";

type Option = {
  value: string | number;
  label: string;
};

type SelectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  options: Option[];
  leadingIcon?: React.ReactNode;
  onClickLeadingIcon?: () => void;
  className?: string;
  selectClassName?: string;
  disabled?: boolean;
  readOnly?: boolean;
};

function Select({
  name,
  label,
  placeholder = "Select option...",
  options,
  leadingIcon,
  onClickLeadingIcon,
  className,
  selectClassName,
  disabled,
}: SelectProps) {
  const [field, meta, helpers] = useField(name);

  console.log(field);

  return (
    <div>
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <div
        className={classNames(
          "flex items-center rounded-lg border-0 bg-white/10 outline-0 p-4",
          className
        )}
      >
        <select
          {...field}
          disabled={disabled}
          value={field.value || ""}
          className={classNames(
            "w-full bg-transparent text-lg outline-none placeholder:text-gray-400 appearance-none",
            selectClassName
          )}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {leadingIcon && (
          <span
            onClick={onClickLeadingIcon}
            className="ml-2 text-gray-400 flex-shrink-0 cursor-pointer"
          >
            {leadingIcon}
          </span>
        )}
      </div>

      {meta.touched && meta.error ? (
        <p className="text-red-500 text-sm mt-1">{meta.error}</p>
      ) : null}
    </div>
  );
}

export default Select;
