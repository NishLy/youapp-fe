import Back from "@/components/buttons/back";
import GradientBackground from "@/components/GradientBackground";
import LayoutMobile from "@/components/layout-mobile";
import React from "react";

type Props = {};

function page({}: Props) {
  return (
    <LayoutMobile>
      <GradientBackground>
        <Back></Back>
      </GradientBackground>
    </LayoutMobile>
  );
}

export default page;
