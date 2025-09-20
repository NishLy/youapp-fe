"use client";

import Button from "@/components/button";
import Back from "@/components/buttons/back";
import GradientBackground from "@/components/GradientBackground";
import Input from "@/components/input";
import LayoutMobile from "@/components/layout-mobile";
import MobileLayout from "@/components/MobileLayout";
import { Form, Formik } from "formik";
import Link from "next/link";
import React from "react";
import { IoIosEyeOff } from "react-icons/io";
import * as Yup from "yup";

const validationScema = Yup.object({
  username: Yup.string()
    .min(3, "Must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8).required("Password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

function page() {
  return (
    <LayoutMobile>
      <GradientBackground>
        <MobileLayout className="flex flex-col py-8 px-4">
          <Back></Back>
          <div className="stack-col h-full justify-center">
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationScema}
              onSubmit={(values) => {
                console.log("✅ Submitted:", values);
              }}
            >
              {({ isValid, dirty }) => (
                <Form className="stack-col gap-y-4">
                  <h1 className="text-3xl px-4 mb-2">Register</h1>
                  <Input name="email" placeholder="Enter Email" />
                  <Input name="username" placeholder="Enter Username" />
                  <Input
                    name="password"
                    placeholder="Enter Password"
                    type="password"
                  />
                  <Input
                    name="confirmPassword"
                    placeholder="Enter Confirmation Password"
                    type="password"
                  />
                  <Button
                    className="mt-4"
                    type="submit"
                    disabled={!(isValid && dirty)}
                  >
                    Register
                  </Button>
                </Form>
              )}
            </Formik>
            <p className="text-center mt-10">
              Have an account{" "}
              <Link className="text-brand-golden underline" href="/login">
                Login Here
              </Link>
            </p>
          </div>
        </MobileLayout>
      </GradientBackground>
    </LayoutMobile>
  );
}

export default page;
