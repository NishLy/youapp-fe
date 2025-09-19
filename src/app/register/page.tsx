import Back from "@/components/buttons/back";
import GradientBackground from "@/components/GradientBackground";
import LayoutMobile from "@/components/layout-mobile";
import MobileLayout from "@/components/MobileLayout";
import React from "react";

type Props = {};

function page({}: Props) {
  return (
    <LayoutMobile>
      <GradientBackground>
        <MobileLayout className="flex flex-col py-8 px-4">
          <Back></Back>
          <div className="stack-col h-full justify-center">
            <div className="stack-col ">
              <h1 className="text-3xl px-8">Register</h1>
            </div>
          </div>
        </MobileLayout>
      </GradientBackground>
    </LayoutMobile>
  );
}

export default page;
