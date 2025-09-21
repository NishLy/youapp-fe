"use client";

import Button from "@/components/button";
import Back from "@/components/buttons/back";
import GradientBackground from "@/components/GradientBackground";
import Input from "@/components/input";
import LayoutMobile from "@/components/layout-mobile";
import MobileLayout from "@/components/MobileLayout";
import { Form, Formik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { setToken } from "@/utils/auth/localToken";
import { IoIosClose } from "react-icons/io";
import { useAtom } from "jotai";
import ProfileAtom from "../state/profile";
import { mutateUpdateProfile } from "../services/query";

function Page() {
  const [profileState] = useAtom(ProfileAtom);
  const router = useRouter();
  const [interests, setInterests] = useState(profileState.interests ?? []);
  const [value, setValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim() !== "") {
      e.preventDefault(); // prevent form submit
      setInterests((prev) => [...prev, value.trim()]);
      setValue(""); // clear input
    }
  };

  const removeInterest = (i: number) => {
    setInterests((prev) => prev.filter((_, idx) => idx !== i));
  };

  const mutateUpdate = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: mutateUpdateProfile,
    onSuccess: (data) => {
      toast.success(data.message);
      router.back();
    },
    onError: (data) => {
      toast.success(data.message);
    },
  });

  const handleSave = () => {
    mutateUpdate.mutateAsync({ ...profileState, interests });
  };

  return (
    <LayoutMobile>
      <GradientBackground>
        <MobileLayout className="flex flex-col h-screen py-8 px-6">
          <Back
            rightIcon={
              <button className="text-blue-300" onClick={handleSave}>
                Save
              </button>
            }
          />
          <div className="stack-col gap-2 mt-20">
            <span className="text-md text-brand-golden">
              Tell everyone about yourself
            </span>
            <span className="text-2xl font-bold">What interest you?</span>
          </div>
          <div className="mt-10 flex flex-wrap w-full box-border bg-white/5 p-4 rounded-lg gap-2">
            {interests.map((e, i) => (
              <div
                key={i}
                className="flex gap-2 w-fit items-center bg-white/10 rounded-md px-2 py-1"
              >
                <span>{e}</span>
                <IoIosClose
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => removeInterest(i)}
                />
              </div>
            ))}

            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 min-w-[120px] bg-transparent outline-none text-white"
              placeholder="Add interest..."
            />
          </div>
        </MobileLayout>
      </GradientBackground>
    </LayoutMobile>
  );
}

export default Page;
