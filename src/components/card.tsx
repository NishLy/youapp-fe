import classNames from "classnames";
import React, { ReactNode } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children?: React.ReactNode;
  actionButton?: ReactNode;
  placeholderText?: string;
}

function Card(props: Props) {
  return (
    <div
      {...props}
      className={classNames(
        "rounded-lg p-4 shadow-md min-h-36 box-border h-fit stack-col",
        props.className
      )}
    >
      <div className="w-full flex justify-between">
        <h2>{props.title}</h2>
        {props.actionButton}
      </div>
      <div className="flex flex-col items-center h-full  mt-4 ">
        {props.children ? (
          props.children
        ) : (
          <div className="stack-col justify-center items-center h-full">
            {props.placeholderText}
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
