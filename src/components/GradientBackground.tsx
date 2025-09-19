import React, { ReactNode } from "react";

type Props = { children: ReactNode };

function GradientBackground({ children }: Props) {
  return <div className=" w-full h-full bg-radial-background">{children}</div>;
}

export default GradientBackground;
