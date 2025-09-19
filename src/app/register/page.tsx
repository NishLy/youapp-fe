import Button from "@/components/button";
import Back from "@/components/buttons/back";
import GradientBackground from "@/components/GradientBackground";
import Input from "@/components/input";
import LayoutMobile from "@/components/layout-mobile";
import MobileLayout from "@/components/MobileLayout";
import Link from "next/link";
import React from "react";
import { IoIosEyeOff } from "react-icons/io";

type Props = {};

function page({}: Props) {
  return (
    <LayoutMobile>
      <GradientBackground>
        <MobileLayout className="flex flex-col py-8 px-4">
          <Back></Back>
          <div className="stack-col h-full justify-center">
            <div className="stack-col gap-y-4">
              <h1 className="text-3xl px-4 mb-2">Register</h1>
              <Input placeholder="Enter Email" />
              <Input placeholder="Enter Username" />
              <Input
                placeholder="Enter Password"
                leadingIcon={<IoIosEyeOff className="w-8 h-8" />}
              />
              <Input
                placeholder="Enter Confirmation Password"
                leadingIcon={<IoIosEyeOff className="w-8 h-8" />}
              />
              <Button className="mt-4">Register</Button>
              <p className="text-center mt-10">
                Have an account{" "}
                <Link className="text-brand-golden underline" href="/login">
                  Login Here
                </Link>
              </p>
            </div>
          </div>
        </MobileLayout>
      </GradientBackground>
    </LayoutMobile>
  );
}

export default page;
